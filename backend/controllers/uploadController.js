import { transcribeAudio } from "../services/transcriptionService.js";
import { correctTranscript } from "../services/correctionService.js";
import { generateMeetingSummary } from "../services/summaryService.js";

export const uploadAudio = async (req, res) => {
    try {

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No audio file uploaded.",
            });
        }

        // Step 1 - Transcribe
        const transcriptResult = await transcribeAudio(req.file.path);

        // Step 2 - Read optional meeting context
        const context = {
            participants: req.body.participants || "",
            organization: req.body.organization || "",
            meetingTopic: req.body.meetingTopic || "",
        };

        // Step 3 - Correct transcript
        const correctedTranscript = await correctTranscript(
            transcriptResult.transcript,
            context
        );

        // Step 4 - Generate summary
        const summaryResult = await generateMeetingSummary(
            correctedTranscript
        );

        // Step 5 - Return response
        res.status(200).json({
            success: true,

            language: transcriptResult.language,

            rawTranscript: transcriptResult.transcript,

            transcript: correctedTranscript,

            summary: summaryResult.summary,

            keyPoints: summaryResult.keyPoints,

            actionItems: summaryResult.actionItems,
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};