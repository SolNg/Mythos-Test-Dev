
import { LSR_DATA } from "../../data/lsr_config";

export interface LsrTableDefinition {
    id: string;
    name: string;
    columns: string[];
}

export const LsrParser = {
    /**
     * Parses the static structure of LSR tables from the configuration.
     * Looks for patterns like "#0 TableName|0:Col1|1:Col2" inside the definition block.
     */
    parseDefinitions(): LsrTableDefinition[] {
        const contentToScan = LSR_DATA.entries["6"].content;
        
        const lines = contentToScan.split('\n');
        const tables: LsrTableDefinition[] = [];

        const tableDefRegex = /^#(\d+)\s+([^|]+)\|(.*)$/;

        lines.forEach(line => {
            const match = line.trim().match(tableDefRegex);
            if (match) {
                const id = match[1];
                const name = match[2].trim();
                const rawColumns = match[3];

                const columns = rawColumns.split('|').map(col => {
                    const colParts = col.split(':');
                    return colParts.length > 1 ? colParts.slice(1).join(':').trim() : col.trim();
                });

                tables.push({ id, name, columns });
            }
        });

        return tables;
    },

    /**
     * Parses the runtime output from AI (Text-based LSR format).
     * Format: #0 Name|0:Val...
     */
    parseLsrString(rawString: string): Record<string, any[]> {
        const result: Record<string, any[]> = {};
        
        if (!rawString) return result;

        const lines = rawString.split('\n');
        
        lines.forEach(line => {
            line = line.trim();
            if (!line.startsWith('#')) return;

            const match = line.match(/^#(\d+)\s+([^|]+)\|(.*)$/);
            if (match) {
                const tableId = match[1];
                const rawData = match[3];

                const rowObj: Record<string, string> = {};
                
                const cols = rawData.split('|');
                cols.forEach(col => {
                    const firstColonIndex = col.indexOf(':');
                    if (firstColonIndex !== -1) {
                        const colIdx = col.substring(0, firstColonIndex).trim();
                        const colVal = col.substring(firstColonIndex + 1).trim();
                        rowObj[colIdx] = colVal;
                    }
                });

                if (!result[tableId]) {
                    result[tableId] = [];
                }
                result[tableId].push(rowObj);
            }
        });

        return result;
    },

    /**
     * Parses the JSON state update from <state_update> tags.
     * Merges into existing state or creates new structure.
     * Updated to support new Schema with exact JSON keys.
     */
    parseStateUpdateJson(jsonString: string, currentState: Record<string, any[]> = {}): Record<string, any[]> {
        let updateData: any;
        try {
            updateData = JSON.parse(jsonString);
        } catch (e) {
            console.error("Failed to parse State Update JSON:", e);
            return currentState;
        }

        const newState = { ...currentState };

        // Helper to map object fields to indexed columns based on schema order
        const mapObjectToColumns = (obj: any, keys: string[]) => {
            const row: Record<string, string> = {};
            keys.forEach((key, index) => {
                row[index.toString()] = obj[key] || "Chưa biết";
            });
            return row;
        };

        // Table #1: Character Info
        if (updateData.character_info && Array.isArray(updateData.character_info)) {
            newState["1"] = updateData.character_info.map((item: any) => 
                mapObjectToColumns(item, ["Name", "Gender", "Age", "Identity", "Body_Features", "Fashion_Style", "Personality", "Hobbies", "Long_term_Goals", "Relationships", "Attitude_towards_User", "Inter_character_Relations", "Context_Role", "Important_Notes"])
            );
        }

        // Table #2: Sexual Info
        if (updateData.sexual_info && Array.isArray(updateData.sexual_info)) {
            newState["2"] = updateData.sexual_info.map((item: any) => 
                mapObjectToColumns(item, ["Name", "Sensitive_Body_Parts", "First_Time", "Sexual_Proficiency", "Private_Parts_Details", "Recent_Partners", "Notes"])
            );
        }

        // Table #3: Schedule Log
        if (updateData.schedule_log && Array.isArray(updateData.schedule_log)) {
            newState["3"] = updateData.schedule_log.map((item: any) => 
                mapObjectToColumns(item, ["Summary", "Overall_Content", "Current_Progress", "Performer", "Delegator", "Reward", "Location", "Start_Time", "End_Limit_Time", "Notes"])
            );
        }

        // Table #4: Abilities
        if (updateData.abilities && Array.isArray(updateData.abilities)) {
            newState["4"] = updateData.abilities.map((item: any) => 
                mapObjectToColumns(item, ["Ability_Name", "Owner", "Usage_Effect", "Limitations", "Notes"])
            );
        }

        // Table #5: Inventory
        if (updateData.inventory && Array.isArray(updateData.inventory)) {
            newState["5"] = updateData.inventory.map((item: any) => 
                mapObjectToColumns(item, ["Item_Name", "Owner", "Current_Location", "Quantity", "Form_Appearance", "Usage", "Limitations", "Notes"])
            );
        }

        // Table #6: Organizations
        if (updateData.organizations && Array.isArray(updateData.organizations)) {
            newState["6"] = updateData.organizations.map((item: any) => 
                mapObjectToColumns(item, ["Org_Name", "Known_Structure", "Member_Traits", "Purpose", "Notes"])
            );
        }

        // Table #7: Locations
        if (updateData.locations && Array.isArray(updateData.locations)) {
            newState["7"] = updateData.locations.map((item: any) => 
                mapObjectToColumns(item, ["Location_Name", "Position_Coordinates", "Spatial_Structure", "Notes"])
            );
        }

        // Table #8: Major Summary (Object -> Table Row)
        // Only update if explicit data is provided (Triggered by Turn 20)
        if (updateData.major_summary) {
            const summary = updateData.major_summary;
            if (summary.Content && summary.Content !== "null" && summary.Content.trim() !== "") {
                 newState["8"] = [mapObjectToColumns(summary, ["Time_Range", "Content"])];
            }
        }

        // Table #9: Event History
        if (updateData.event_history && Array.isArray(updateData.event_history)) {
            const newEvents = updateData.event_history.map((item: any) => 
                mapObjectToColumns(item, ["Time", "Location", "Event_Description"])
            );
            newState["9"] = newEvents;

            // Logic to update Table #0 (Current Info) using the latest event data
            if (newEvents.length > 0) {
                const latestEvent = updateData.event_history[updateData.event_history.length - 1];
                newState["0"] = [{
                    "0": latestEvent.Time || "Chưa biết",
                    "1": latestEvent.Location || "Chưa biết"
                }];
            }
        }

        return newState;
    }
};
