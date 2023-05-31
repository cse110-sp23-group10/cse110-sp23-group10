const shakeBall = require('./8ball_main');

describe('shakeBall function', () => {
  let mockAlert;
  let mockInterval;

  /**
   * Run this before every test
   */
  beforeEach(() => {
    // Mock the alert and setInterval functions
    mockAlert = jest.spyOn(window, 'alert').mockImplementation(() => {});
    mockInterval = jest.spyOn(window, 'setInterval').mockImplementation(() => {});
  });

  /**
   * Run this after every test
   */
  afterEach(() => {
    // Restore the original functions after each test
    mockAlert.mockRestore();
    mockInterval.mockRestore();
  });

  /**
   * Test 1: when input is empty
   */
  it('should send an alert if question is empty', () => {
    // Set up the initial HTML
    document.body.innerHTML = `
      <input id="question" value="" />
      <p id="answer"></p>
    `;
    shakeBall();
    expect(mockAlert).toHaveBeenCalledWith(
      "Don't be lazy and type something, I refuse to answer unless you said something",
    );
  });

  /**
   * Test 2: Make sure there is output at the correct location on frontend
   */
  it('should display a random answer', () => {
    // Set up the initial HTML
    document.body.innerHTML = `
      <input id="question" value="Will I pass the test?" />
      <p id="answer"></p>
    `;
    jest.useFakeTimers();
    shakeBall();
    jest.advanceTimersByTime(5000);

    const answerEl = document.getElementById('answer');
    expect(answerEl.textContent).not.toBe('');
  });

  /**
   * Test 3: Make sure there is output is from expected output
   */
  it('should display a random answer from the list for 10 tries', () => {
    const answers = [
      "Just Don't",
      'Definitely not',
      'Signs point to nope',
      'Sorry, try again',
      'Not looking good',
      'Outlook not so good',
      "Don't even try",
      "Come on I just told you don't even try, believe me",
      'My sources say no',
      "Don't count on it",
      'Very doubtful',
      "It is decidedly so, unless you're asking if you can borrow my car.",
      "Don't count on it, unless you're counting on me to make a sarcastic comment.",
    ];

    document.body.innerHTML = `
      <input id="question" value="Will I pass the test?" />
      <p id="answer"></p>
    `;
    jest.useFakeTimers();
    shakeBall();
    jest.advanceTimersByTime(10000); // needs to be long enough so the entire answer loads

    // Check that answer is from the list
    const answerEl = document.getElementById('answer');
    expect(answers).toContain(answerEl.textContent);
  });
});
