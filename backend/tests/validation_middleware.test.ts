import { describe, it, expect } from 'bun:test';
import { z } from 'zod';
import { validate } from '../src/middlewares/validationMiddleware';
import type { Request, Response } from 'express';

describe('Validation Middleware (Zod)', () => {
  const testSchema = z.object({
    email: z.string().email('Format email salah'),
    age: z.number().min(18, 'Usia minimal 18 tahun'),
  });

  function createMockContext(body: any) {
    const req = { body } as unknown as Request;
    let statusCode = 200;
    let jsonBody: any = null;
    let nextCalled = false;

    const res = {
      status(code: number) {
        statusCode = code;
        return this;
      },
      json(data: any) {
        jsonBody = data;
        return this;
      },
    } as unknown as Response;

    const next = () => {
      nextCalled = true;
    };

    return { req, res, next, getStatus: () => statusCode, getJson: () => jsonBody, wasNextCalled: () => nextCalled };
  }

  it('should call next() and clean req.body when payload is valid', () => {
    const mw = validate(testSchema);
    const ctx = createMockContext({ email: 'test@kampus.ac.id', age: 21, extraField: 'ignored' });

    mw(ctx.req, ctx.res, ctx.next);

    expect(ctx.wasNextCalled()).toBe(true);
    expect(ctx.getStatus()).toBe(200);
    expect(ctx.req.body.email).toBe('test@kampus.ac.id');
    expect(ctx.req.body.age).toBe(21);
  });

  it('should reject with 400 when required fields are missing or invalid', () => {
    const mw = validate(testSchema);
    const ctx = createMockContext({ email: 'bukan-email', age: 15 });

    mw(ctx.req, ctx.res, ctx.next);

    expect(ctx.wasNextCalled()).toBe(false);
    expect(ctx.getStatus()).toBe(400);
    expect(ctx.getJson().success).toBe(false);
    expect(ctx.getJson().message).toContain('Validasi gagal');
    expect(ctx.getJson().message).toContain('Format email salah');
  });
});

