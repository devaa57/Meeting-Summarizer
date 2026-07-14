import sys
import json
from faster_whisper import WhisperModel

audio_path = sys.argv[1]

model = WhisperModel(
    "small",
    device="cpu",
    compute_type="int8"
)

segments, info = model.transcribe(audio_path)

transcript = ""

for segment in segments:
    transcript += segment.text + " "

result = {
    "language": info.language,
    "transcript": transcript.strip()
}

print(json.dumps(result))