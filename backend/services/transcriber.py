"""
Whisper transcription stub.
In production, replace with actual Whisper integration (openai-whisper or faster-whisper).
"""


def transcribe_audio(content: bytes, filename: str) -> str:
    """
    Transcribe audio or video file to text.
    Currently a stub — returns a placeholder message.
    To activate: pip install faster-whisper and implement below.
    """
    # Stub implementation
    return (
        "[Transcription not yet implemented. "
        "To enable, install faster-whisper and integrate WhisperModel here. "
        f"File received: {filename}, size: {len(content)} bytes]"
    )
