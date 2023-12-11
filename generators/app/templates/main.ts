import type {RagnarokPlugin, Keymap} from "ragnarok-api";

export default class Plugin implements RagnarokPlugin {
    onLoad(): Promise<void> {
        throw new Error("Method not implemented.");
    }

	onUnload(): Promise<void> {
        throw new Error("Method not implemented.");
	}

	registerKeybinds(keymap: Keymap): Promise<void> {
        throw new Error("Method not implemented.");
	}
}
