import * as reffects from "reffects";
import * as apiUrlCoeffect from "./apiUrl";
import { destroyAllMocks } from "../../testHelpers/fixtures";
import { callsTo } from "../../testHelpers/mockHelpers";

describe("apiUrl coeffect", () => {
  afterEach(() => {
    reffects.clearHandlers();
    destroyAllMocks();
  });

  test("should return the expected api url", () => {
    const apiUrl = "https://gateway.marvel.com/v1/public/characters?ts=thesoer&apikey=001ac6c73378bbfff488a36141458af2&hash=72e5ed53d1398abb831c3ceec263f18b";
    const coeffectId = "apiUrl";
    const globals = { apiUrl: apiUrl };
    apiUrlCoeffect.register(globals);
    const apiUrlHandler = reffects.getCoeffectHandler(coeffectId);

    expect(apiUrlHandler()).toEqual({ [coeffectId]: apiUrl });
  });
});

