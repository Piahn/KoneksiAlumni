import { describe, it, expect } from 'bun:test';
import { successResponse, errorResponse } from '../src/utils/apiResponse';
import type { Response } from 'express';

describe('API Response Helpers', () => {
  function createMockResponse() {
    let statusCode = 200;
    let jsonBody: any = null;

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

    return { res, getStatus: () => statusCode, getJson: () => jsonBody };
  }

  it('successResponse should format standard success JSON', () => {
    const { res, getStatus, getJson } = createMockResponse();

    successResponse(res, { id: '123' }, 'Data berhasil dimuat', 200);

    expect(getStatus()).toBe(200);
    expect(getJson().success).toBe(true);
    expect(getJson().message).toBe('Data berhasil dimuat');
    expect(getJson().data.id).toBe('123');
  });

  it('errorResponse should format standard error JSON with custom status code', () => {
    const { res, getStatus, getJson } = createMockResponse();

    errorResponse(res, 'Slot tidak ditemukan', 404);

    expect(getStatus()).toBe(404);
    expect(getJson().success).toBe(false);
    expect(getJson().message).toBe('Slot tidak ditemukan');
    expect(getJson().data).toBeUndefined();
  });
});

