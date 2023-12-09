import type {RagnarokPlugin} from "@wintersteve25/ragnarok-api";

export default class Plugin implements RagnarokPlugin {
    onLoad(): Promise<void> {
        throw new Error("Method not implemented.");
    }
}
