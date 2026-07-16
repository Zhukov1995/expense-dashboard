import { describe, it, expect } from "vitest";
import { formatRub, formatDate, formatMonth } from "./format";

describe("formatRub", () => {
  it("форматирует с разделителем тысяч и знаком рубля", () => {
    const result = formatRub(12500).replace(/ /g, " ");
    expect(result).toContain("₽");
    expect(result).toMatch(/12.500/);
  });

  it("форматирует ноль", () => {
    expect(formatRub(0)).toContain("0");
  });
});

describe("formatDate", () => {
  it("формат ДД.ММ.ГГГГ", () => {
    expect(formatDate("2026-07-16")).toBe("16.07.2026");
  });
});

describe("formatMonth", () => {
  it("месяц и год по-русски", () => {
    expect(formatMonth("2026-07-16").toLowerCase()).toContain("июль");
    expect(formatMonth("2026-07-16")).toContain("2026");
  });
});
