import * as reffects from "reffects";
import * as httpEffects from "./httpEffects";
import * as httpClientModule from "../infrastructure/httpClient";
import { destroyAllMocks } from "../../testHelpers/fixtures";
import { callsTo } from "../../testHelpers/mockHelpers";

describe("http effects", () => {
  describe("get effect", () => {
    expect(httpClientModule.get).toBeDefined();
    expect(reffects.dispatch).toBeDefined();

    afterEach(() => {
      reffects.clearHandlers();
      destroyAllMocks();
    });

    test("should call the http client well", () => {
      const effectId = "get";
      const responseData = "responseData";
      const fakeHttpClient = {get: function({url, successFn}) {return successFn({data: responseData});}};
      const dispatch = jest.fn();
      httpEffects.register(fakeHttpClient, dispatch);
      const httpeffectHandler = reffects.getEffectHandler(effectId);
      const successEventId = "successEventId"
      const successEventRestOfPayload = ["arg1", "arg2"];

      httpeffectHandler({url: "url", successEvent: [successEventId, successEventRestOfPayload[0], successEventRestOfPayload[1]]});
      
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(callsTo(dispatch)).toEqual([[{eventId: "successEventId", payload: ["responseData", "arg1", "arg2"]}]]);
    });
  });
});