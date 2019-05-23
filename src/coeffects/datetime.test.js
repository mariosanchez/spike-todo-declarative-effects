import * as datetimeCoeffect from "./datetime";
import { destroyAllMocks } from "../../testHelpers/fixtures";
import { clearHandlers, getCoeffectHandler } from "reffects";

describe("datetime coeffect", () => {
  afterEach(() => {
    clearHandlers();
    destroyAllMocks();
  });

  test("should extract the expected date", () => {
    const coeffectId = "datetime";
    const expectedDateTime = "anyDateTime";
    datetimeCoeffect.register({ now: () => expectedDateTime });
    const dateTimeHandler = getCoeffectHandler(coeffectId);

    expect(dateTimeHandler()).toEqual({ [coeffectId]: expectedDateTime });
  });
});