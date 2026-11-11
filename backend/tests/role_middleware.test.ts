import { describe, it, expect } from 'bun:test';
import { authorize } from '../src/middlewares/roleMiddleware';
import type { Request, Response } from 'express';

describe('Role-Based Access Control (RBAC) Middleware', () => {
  function createMockContext(userProfile: any) {
    const req = {
      user: userProfile ? { id: 'u1', profile: userProfile } : undefined,
    } as unknown as Request;

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

  it('should allow access when user role matches allowed roles', () => {
    const mw = authorize('student');
    const ctx = createMockContext({ role: 'student', is_verified: true });

    mw(ctx.req, ctx.res, ctx.next);

    expect(ctx.wasNextCalled()).toBe(true);
    expect(ctx.getStatus()).toBe(200);
  });

  it('should reject access (403) when user role does not match', () => {
    const mw = authorize('alumni');
    const ctx = createMockContext({ role: 'student', is_verified: true });

    mw(ctx.req, ctx.res, ctx.next);

    expect(ctx.wasNextCalled()).toBe(false);
    expect(ctx.getStatus()).toBe(403);
    expect(ctx.getJson().success).toBe(false);
    expect(ctx.getJson().message).toContain('tidak memiliki izin');
  });

  it('should reject access (403) when alumni is not verified yet', () => {
    const mw = authorize('alumni');
    const ctx = createMockContext({ role: 'alumni', is_verified: false });

    mw(ctx.req, ctx.res, ctx.next);

    expect(ctx.wasNextCalled()).toBe(false);
    expect(ctx.getStatus()).toBe(403);
    expect(ctx.getJson().message).toContain('menunggu verifikasi');
  });

  it('should allow verified alumni to proceed', () => {
    const mw = authorize('alumni');
    const ctx = createMockContext({ role: 'alumni', is_verified: true });

    mw(ctx.req, ctx.res, ctx.next);

    expect(ctx.wasNextCalled()).toBe(true);
  });

  it('should reject access (403) when profile is missing', () => {
    const mw = authorize('admin');
    const ctx = createMockContext(null);

    mw(ctx.req, ctx.res, ctx.next);

    expect(ctx.wasNextCalled()).toBe(false);
    expect(ctx.getStatus()).toBe(403);
  });
});

