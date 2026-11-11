import { describe, it, expect } from 'bun:test';
import app from '../src/app';

describe('Auth Guard Middleware', () => {
  it('GET /api/alumni should reject request without token with 401', async () => {
    const server = app.listen(0);
    const address = server.address() as any;
    const port = address.port;

    const res = await fetch(`http://localhost:${port}/api/alumni`);
    const json = await res.json();

    expect(res.status).toBe(401);
    expect(json.success).toBe(false);

    server.close();
  });

  it('POST /api/bookings should reject request without token with 401', async () => {
    const server = app.listen(0);
    const address = server.address() as any;
    const port = address.port;

    const res = await fetch(`http://localhost:${port}/api/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slot_id: 'test' }),
    });
    const json = await res.json();

    expect(res.status).toBe(401);
    expect(json.success).toBe(false);

    server.close();
  });
});
