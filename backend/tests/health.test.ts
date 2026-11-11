import { describe, it, expect } from 'bun:test';
import app from '../src/app';

describe('Health Check API', () => {
  it('GET /api/health returns 200 and runtime info', async () => {
    // Gunakan Bun native fetch pada Express app instance
    const server = app.listen(0);
    const address = server.address() as any;
    const port = address.port;

    const res = await fetch(`http://localhost:${port}/api/health`);
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.success).toBe(true);
    expect(json.data.runtime).toBe('bun');

    server.close();
  });
});
