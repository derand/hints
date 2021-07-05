### HowTo record with QuickTine sound from speakers and microphone

1. Install [Soundflower](https://github.com/mattingalls/Soundflower/releases).
2. Open Audio Midi Setup, create an aggregate device, and check Built-in Microphone and Soundflower (2ch):
![qt01](../images/qt01.png?raw=true "Audio Midi Setup")
3. Create a multi-output device and check Soundflower (2ch). If you want to hear the audio while you're recording it, also check Built-in Output.
![qt02](../images/qt02.png?raw=true "Audio Midi Setup")
4. Set the default output device to the multi-output device from System Preferences.
5. Select New Screen Recording in QuickTime Player, set the input to the aggregate device, and keep the volume slider at zero.
![qt03](../images/qt03.png?raw=true "QuickTime")
6. Start recording.
