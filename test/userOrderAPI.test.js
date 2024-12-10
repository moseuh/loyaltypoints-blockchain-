const UserOrderAPI = artifacts.require("UserOrderAPI");
const Oracle = artifacts.require("Oracle");

contract("UserOrderAPI", (accounts) => {
  it("should fetch user data and emit an event", async () => {
    const oracle = await Oracle.deployed();
    const userOrderAPI = await UserOrderAPI.deployed();

    // Simulate the API request
    const userId = 1;
    const mockResponse = "User purchased product data here";

    // Request data
    await userOrderAPI.fetchUserData(userId, { from: accounts[0] });

    // Fulfill request in Oracle
    await oracle.fulfillUserData(userId, mockResponse, { from: accounts[0] });

    // Check for emitted event
    const events = await userOrderAPI.getPastEvents("UserDataFetched");
    assert.equal(events.length, 1);
    assert.equal(events[0].args.userId.toString(), userId.toString());
    assert.equal(events[0].args.response, mockResponse);
  });
});
