import {SelectBox} from "./selectbox";
import {ListSelectorConfig} from "./listselector";
import {UIManager} from "../uimanager";

export class AudioTrackSelectBox extends SelectBox {

    constructor(config: ListSelectorConfig = {}) {
        super(config);
    }

    configure(player: bitmovin.player.Player, uimanager: UIManager): void {
        let self = this;
        let audioTracks = player.getAvailableAudio();

        // Add audio qualities
        for(let audioTrack of audioTracks) {
            self.addItem(audioTrack.id, audioTrack.label);
        }

        self.onItemSelected.subscribe(function(sender: AudioTrackSelectBox, value: string) {
            player.setAudio(value);
        });

        let audioTrackHandler = function () {
            let currentAudioTrack = player.getAudio();
            self.selectItem(currentAudioTrack.id);
        };

        player.addEventHandler(bitmovin.player.EVENT.ON_AUDIO_CHANGE, audioTrackHandler);
    }
}