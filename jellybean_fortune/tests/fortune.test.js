/**
 * @jest-environment jest-environment-jsdom
 */

const fortuneTest = require("../scripts/fortune.js");

test("Clicking on the same jellybean twice should cause the opacity and text to return to default", () => {
  const beans = document.querySelectorAll('img[alt="Hover over me"]');
  for (let i = 0; i < beans.length; i++) {
    beans[i].click();
    beans[i].click();
    delay(1000);

    expect(beans[i].style.opacity).toBe("1");
    expect(beans[i].style.transform).toBe("scale(1)");
  }
});

test("Clicking on a jellybean should make the others smaller and lower their opacity", () => {
  // Simulate clicking on the beans
  let styling = true;

  const beans = document.querySelectorAll('img[alt="Hover over me"]');
  for (let i = 0; i < beans.length; i++) {
    beans[i].click();
    delay(1000);
    // check current beans properties
    styling &= beans[i].style.opacity == "1";
    styling &= beans[i].style.transform == "scale(1)";
    // check the other beans properties
    for (let j = 0; j < beans.length; j++) {
      if (i === j) continue;
      styling &= beans[j].style.opacity == "0.5";
      styling &= beans[j].style.transform == "scale(0.8)";
    }
  }

  // Assert that the current page URL is the expected value
  expect(styling).toBe(true);
});

describe("Fortune in local storage", () => {
  beforeEach(() => {
    // Clear local storage before each test
    localStorage.clear();
  });

  it("should be populated when a fortune is saved", () => {
    // clickig on the beans
    const beans = document.querySelectorAll('img[alt="Hover over me"]');
    for (let i = 0; i < beans.length; i++) {
      beans[i].click();
      delay(500);
    }

    // Retrieve the fortune from local storage
    const fortune = fortuneTest.getFortuneFromLocalStorage();

    // Assert that the fortune is populated correctly
    expect(fortune).toBeFalsy();
  });

  it("should be empty when no fortune is saved", () => {
    // Retrieve the fortune from local storage
    const fortune = fortuneTest.getFortuneFromLocalStorage();

    // Assert that the fortune is empty (null or undefined)
    expect(fortune).toBeFalsy();
  });
});
