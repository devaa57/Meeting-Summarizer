import { execFile } from "child_process";
import { promisify } from "util";
import path from "path";
import { fileURLToPath } from "url";

const execFileAsync = promisify(execFile);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const transcribeAudio = async (audioPath) => {
    try {
        const pythonScript = path.resolve(
            __dirname,
            "../../transcriber/transcribe.py"
        );

        const { stdout } = await execFileAsync(
            process.env.PYTHON_PATH,
            [pythonScript, audioPath]
        );

        return JSON.parse(stdout);
    } catch (error) {
    console.error("========== TRANSCRIPTION ERROR ==========");
    console.error(error);
    console.error("stdout:", error.stdout);
    console.error("stderr:", error.stderr);
    console.error("=========================================");

    throw new Error("Transcription failed.");
}
};