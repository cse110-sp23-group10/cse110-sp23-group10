/**
 * Test file for Service Worker
 */
const makeServiceWorkerEnv = require("service-worker-mock");
describe("serviceWorker", () => {
  beforeEach(() => {
    const serviceWorkerEnv = makeServiceWorkerEnv();
    Object.defineProperty(serviceWorkerEnv, "addEventListener", {
      value: serviceWorkerEnv.addEventListener,
      enumerable: true,
    });
    Object.assign(global, serviceWorkerEnv);
    jest.resetModules();
  });
  /**
   * This test checks if the all listeners for the service workers
   * are working fine or not
   */
  it("should add listeners", async () => {
    require("../../sw");
    await self.trigger("install");
    expect(self.listeners.get("install")).toBeDefined();
    expect(self.listeners.get("activate")).toBeDefined();
    expect(self.listeners.get("fetch")).toBeDefined();
  });
  /**
   * This test checks if the old cache is deleted on
   * activation of new service worker
   */
  it("should delete old caches on activate", async () => {
    require("../../sw");
    // Create old cache
    await self.caches.open("OLD_CACHE");
    expect(self.snapshot().caches.OLD_CACHE).toBeDefined();
    // Activate and verify old cache is removed
    await self.trigger("activate");
    expect(self.snapshot().caches.OLD_CACHE).toStrictEqual({});
  });
  /**
   * This test checks whether a cached response is returned or not
   */
  it("should return a cached response", async () => {
    require("../../sw");
    const cachedResponse = { clone: () => {}, data: { key: "value" } };
    const cachedRequest = new Request("../scripts/");
    const cache = await self.caches.open("jellybean_cache");
    cache.put(cachedRequest, cachedResponse);
    const response = await self.trigger("fetch", cachedRequest);
    expect(response.data.key).toEqual("value");
  }, 10000);
});