# Security Policy

## Reporting Security Vulnerabilities

OpenRefugio is an offline-first, client-only application designed to safeguard emergency plans and household preparedness data without sending information to external servers.

If you discover a security vulnerability (such as a flaw in the cryptographic QR generator, AES-GCM decryption, DOM injection, or unintended network communication), please follow these guidelines:

1. **Do not create a public GitHub issue** to report critical security flaws.
2. Send an email to `security@zaswear.com` (or submit a private security advisory through GitHub).
3. Include detailed steps to reproduce the issue, along with proof-of-concept code or test payloads.

## Security Principles

- **Zero Remote Dependencies:** No external CDNs, tracking pixels, or remote scripts are permitted.
- **Client-Side Only:** No server-side telemetry or remote API calls. All calculations and storage remain in local browser sandbox storage (`localStorage`, `IndexedDB`).
- **No Password or Plaintext Secret Storage:** Users are reminded not to store master passwords or raw keys in unencrypted fields.
- **Safe HTML Rendering:** User-provided text fields are escaped to prevent XSS.
