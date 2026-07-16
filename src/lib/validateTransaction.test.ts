import { describe, it, expect } from "vitest";
import { validateTransaction } from "./validateTransaction";

describe("validateTransaction", () => {
  const valid = {
    amount: "1500",
    category: "food",
    date: "2026-07-16",
  };

  it("без ошибок при корректном вводе", () => {
    expect(validateTransaction(valid)).toEqual({});
  });

  it("сумма обязательна и должна быть положительной", () => {
    expect(validateTransaction({ ...valid, amount: "" }).amount).toBeTruthy();
    expect(validateTransaction({ ...valid, amount: "0" }).amount).toBeTruthy();
    expect(validateTransaction({ ...valid, amount: "-5" }).amount).toBeTruthy();
    expect(validateTransaction({ ...valid, amount: "abc" }).amount).toBeTruthy();
  });

  it("категория обязательна", () => {
    expect(validateTransaction({ ...valid, category: "" }).category).toBeTruthy();
  });

  it("дата обязательна", () => {
    expect(validateTransaction({ ...valid, date: "" }).date).toBeTruthy();
  });
});
