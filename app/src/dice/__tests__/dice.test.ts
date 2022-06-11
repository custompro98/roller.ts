import Die, {
  d2,
  d4,
  d6,
  d8,
  d10,
  d12,
  d20,
  d100,
  isValidDieIndex,
} from "../dice";
import { AceOperator } from "../types";

describe("dice", () => {
  describe("d2", () => {
    it("returns a number between 1 and 2", () => {
      for (let i = 0; i < 1000; i++) {
        const result = d2();
        expect(result).toBeGreaterThan(0);
        expect(result).toBeLessThanOrEqual(2);
      }
    });
  });

  describe("d4", () => {
    it("returns a number between 1 and 4", () => {
      for (let i = 0; i < 1000; i++) {
        const result = d4();
        expect(result).toBeGreaterThan(0);
        expect(result).toBeLessThanOrEqual(4);
      }
    });
  });

  describe("d6", () => {
    it("returns a number between 1 and 6", () => {
      for (let i = 0; i < 1000; i++) {
        const result = d6();
        expect(result).toBeGreaterThan(0);
        expect(result).toBeLessThanOrEqual(6);
      }
    });
  });

  describe("d8", () => {
    it("returns a number between 1 and 8", () => {
      for (let i = 0; i < 1000; i++) {
        const result = d8();
        expect(result).toBeGreaterThan(0);
        expect(result).toBeLessThanOrEqual(8);
      }
    });
  });

  describe("d10", () => {
    it("returns a number between 1 and 10", () => {
      for (let i = 0; i < 1000; i++) {
        const result = d10();
        expect(result).toBeGreaterThan(0);
        expect(result).toBeLessThanOrEqual(10);
      }
    });
  });

  describe("d12", () => {
    it("returns a number between 1 and 12", () => {
      for (let i = 0; i < 1000; i++) {
        const result = d12();
        expect(result).toBeGreaterThan(0);
        expect(result).toBeLessThanOrEqual(12);
      }
    });
  });

  describe("d20", () => {
    it("returns a number between 1 and 20", () => {
      for (let i = 0; i < 1000; i++) {
        const result = d20();
        expect(result).toBeGreaterThan(0);
        expect(result).toBeLessThanOrEqual(20);
      }
    });
  });

  describe("d100", () => {
    it("returns a number between 1 and 100", () => {
      for (let i = 0; i < 1000; i++) {
        const result = d100();
        expect(result).toBeGreaterThan(0);
        expect(result).toBeLessThanOrEqual(100);
      }
    });
  });

  describe("isValidDieIndex", () => {
    it("returns true for a valid die type", () => {
      expect(isValidDieIndex("d6")).toBeTruthy();
    });

    it("returns false for an invalid die type", () => {
      expect(isValidDieIndex("d5")).toBeFalsy();
    });
  });
});

describe("Die", () => {
  it("wraps a DiceFunction", () => {
    const fudgedRoll = 4;
    const mockDiceFunction = jest.fn().mockReturnValue(fudgedRoll);

    new Die(mockDiceFunction);

    expect(mockDiceFunction).toHaveBeenCalledTimes(1);
  });

  it("calls the DiceFunction once per number of dice", () => {
    const fudgedRoll = 4;
    const mockDiceFunction = jest.fn().mockReturnValue(fudgedRoll);
    const numDice = 10;

    new Die(mockDiceFunction, numDice);

    expect(mockDiceFunction).toHaveBeenCalledTimes(numDice);
  });

  describe("value", () => {
    it("returns the sum of all dice by default", () => {
      const fudgedRoll = 4;
      const mockDiceFunction = jest.fn().mockReturnValue(fudgedRoll);
      const numDice = 10;

      const subject = new Die(mockDiceFunction, numDice);

      expect(subject.value()).toEqual(fudgedRoll * numDice);
    });

    it("returns the sum of the highest (n - dl) dice if dl is passed", () => {
      const minRoll = 1;
      const fudgedRoll = 4;
      const mockDiceFunction = jest
        .fn()
        .mockReturnValueOnce(minRoll)
        .mockReturnValue(fudgedRoll);
      const numDice = 10;
      const numDropped = 1;

      const subject = new Die(mockDiceFunction, numDice, { dl: numDropped });

      expect(subject.value()).toEqual(fudgedRoll * (numDice - numDropped));
    });

    it("returns the sum of the lowest (n - dh) dice if dh is passed", () => {
      const maxRoll = 4;
      const fudgedRoll = 1;
      const mockDiceFunction = jest
        .fn()
        .mockReturnValueOnce(maxRoll)
        .mockReturnValue(fudgedRoll);
      const numDice = 10;
      const numDropped = 1;

      const subject = new Die(mockDiceFunction, numDice, { dh: numDropped });

      expect(subject.value()).toEqual(fudgedRoll * (numDice - numDropped));
    });

    it("handles compounding dice if ace is passed", () => {
      const maxRoll = 4;
      const fudgedRoll = 1;
      const mockDiceFunction = jest
        .fn()
        .mockReturnValueOnce(maxRoll)
        .mockReturnValueOnce(fudgedRoll);
      const numDice = 1;

      const subject = new Die(mockDiceFunction, numDice, {
        ace: {
          target: maxRoll,
          operator: AceOperator.eq,
        },
      });

      expect(subject.value()).toEqual(maxRoll + fudgedRoll);
    });

    it("handles compounding dice if ace greater than is passed", () => {
      const maxRoll = 4;
      const fudgedRoll = 1;
      const mockDiceFunction = jest
        .fn()
        .mockReturnValueOnce(maxRoll)
        .mockReturnValueOnce(fudgedRoll);
      const numDice = 1;

      const subject = new Die(mockDiceFunction, numDice, {
        ace: {
          target: maxRoll - 1,
          operator: AceOperator.ge,
        },
      });

      expect(subject.value()).toEqual(maxRoll + fudgedRoll);
    });

    it("handles compounding dice if ace less than is passed", () => {
      const minRoll = 1;
      const fudgedRoll = 3;
      const mockDiceFunction = jest
        .fn()
        .mockReturnValueOnce(minRoll)
        .mockReturnValueOnce(fudgedRoll);
      const numDice = 1;

      const subject = new Die(mockDiceFunction, numDice, {
        ace: {
          target: minRoll + 1,
          operator: AceOperator.le,
        },
      });

      expect(subject.value()).toEqual(minRoll + fudgedRoll);
    });
  });
});
