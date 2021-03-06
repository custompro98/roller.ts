import { parse } from "../parser";
import * as dice from "../../dice";

describe("parse", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();

    jest.spyOn(dice, "d2").mockReturnValue(2);
    jest.spyOn(dice, "d4").mockReturnValue(4);
    jest.spyOn(dice, "d6").mockReturnValue(6);
    jest.spyOn(dice, "d8").mockReturnValue(8);
    jest.spyOn(dice, "d10").mockReturnValue(10);
    jest.spyOn(dice, "d12").mockReturnValue(12);
    jest.spyOn(dice, "d20").mockReturnValue(20);
    jest.spyOn(dice, "d100").mockReturnValue(100);
  });

  it("returns an empty array for no input", () => {
    const input = "";
    const result = parse(input);

    expect(result.length).toEqual(0);
  });

  it("can parse a straight value", () => {
    const input = "5";
    const result = parse(input);

    expect(result.length).toEqual(1);
    expect(result[0].value()).toEqual(5);
  });

  it("can parse a straight negative value", () => {
    const input = "-5";
    const result = parse(input);

    expect(result.length).toEqual(1);
    expect(result[0].value()).toEqual(-5);
  });

  it("can parse two straight values", () => {
    const input = "5+3";
    const result = parse(input);

    expect(result.length).toEqual(2);
    expect(result[0].value()).toEqual(5);
    expect(result[1].value()).toEqual(3);
  });

  it("can parse two straight values where one is negative", () => {
    const input = "5+-3";
    const result = parse(input);

    expect(result.length).toEqual(2);
    expect(result[0].value()).toEqual(5);
    expect(result[1].value()).toEqual(-3);
  });

  it("ignores bad straight value inputs", () => {
    const input = "hello";
    const result = parse(input);

    expect(result.length).toEqual(0);
  });

  it("can parse a die", () => {
    const input = "d6";
    const result = parse(input);

    expect(result.length).toEqual(1);
    expect(result[0].value()).toEqual(6);
  });

  it("can parse two dice", () => {
    const input = "d6 + d4";
    const result = parse(input);

    expect(result.length).toEqual(2);
    expect(result[0].value()).toEqual(6);
    expect(result[1].value()).toEqual(4);
  });

  it("can parse two dice shorthand", () => {
    const input = "2d6";
    const result = parse(input);

    expect(result.length).toEqual(1);
    expect(result[0].value()).toEqual(12);
  });

  it("groups two dice shorthand with drop lowest", () => {
    const input = "2d6dl1";
    const result = parse(input);

    expect(result.length).toEqual(1);
    expect(result[0].value()).toEqual(6);
  });

  it("groups two dice shorthand with drop lowest > 1 digits", () => {
    const input = "20d6dl19";
    const result = parse(input);

    expect(result.length).toEqual(1);
    expect(result[0].value()).toEqual(6);
  });

  it("groups two dice shorthand with drop highest", () => {
    const input = "2d6dh1";
    const result = parse(input);

    expect(result.length).toEqual(1);
    expect(result[0].value()).toEqual(6);
  });

  it("can parse one die shorthand", () => {
    const input = "1d6";
    const result = parse(input);

    expect(result.length).toEqual(1);
    expect(result[0].value()).toEqual(6);
  });

  it("can parse dice and straight values", () => {
    const input = "1d6 + 56";
    const result = parse(input);

    expect(result.length).toEqual(2);
    expect(result[0].value()).toEqual(6);

    expect(result[1].value()).toEqual(56);
  });

  it("can parse dice and straight values with a negative", () => {
    const input = "1d6 + -56";
    const result = parse(input);

    expect(result.length).toEqual(2);
    expect(result[0].value()).toEqual(6);

    expect(result[1].value()).toEqual(-56);
  });

  it("can parse dice and straight values and leaves them in inputted order", () => {
    const input = "56 + 1d6";
    const result = parse(input);

    expect(result.length).toEqual(2);
    expect(result[0].value()).toEqual(56);

    expect(result[1].value()).toEqual(6);
  });

  it("can parse when a dice should ace", () => {
    jest.spyOn(dice, "d6").mockReturnValueOnce(6).mockReturnValueOnce(3);

    const input = "1d6!";
    const result = parse(input);

    expect(result.length).toEqual(1);
    expect(result[0].value()).toEqual(9);
  });

  it("can parse when a dice should ace at a different target", () => {
    jest.spyOn(dice, "d6").mockReturnValueOnce(5).mockReturnValueOnce(3);

    let input = "1d6!5";
    let result = parse(input);

    expect(result.length).toEqual(1);
    expect(result[0].value()).toEqual(8);

    jest.spyOn(dice, "d6").mockReturnValueOnce(6).mockReturnValueOnce(3);

    input = "1d6!5";
    result = parse(input);

    expect(result.length).toEqual(1);
    expect(result[0].value()).toEqual(6);
  });

  it("can parse when a dice should ace in a greater than range", () => {
    jest
      .spyOn(dice, "d6")
      .mockReturnValueOnce(4)
      .mockReturnValueOnce(5)
      .mockReturnValueOnce(3);

    const input = "1d6!>4";
    const result = parse(input);

    expect(result.length).toEqual(1);
    expect(result[0].value()).toEqual(12);
  });

  it("ignores bad dice inputs", () => {
    const input = "nd6";
    const result = parse(input);

    expect(result.length).toEqual(0);
  });

  it("can parse when a dice should ace in a less than range", () => {
    jest
      .spyOn(dice, "d6")
      .mockReturnValueOnce(3)
      .mockReturnValueOnce(4)
      .mockReturnValueOnce(5);

    const input = "1d6!<4";
    const result = parse(input);

    expect(result.length).toEqual(1);
    expect(result[0].value()).toEqual(12);
  });

  it("ignores bad dice inputs", () => {
    const input = "nd6";
    const result = parse(input);

    expect(result.length).toEqual(0);
  });
});
