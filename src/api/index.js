export async function callBackend({
  url,
  method,
  body,
  actions,
  dispatch,
  isFile,
}) {
  const { REQUEST, SUCCESS, FAILURE } = actions;
  try {
    //   * Set loading
    dispatch({ type: REQUEST });
    // * Call backend
    const response = await fetch(url, {
      method: method,
      body: method === "GET" ? null : JSON.stringify(body),
      headers: {
        "Content-Type": isFile ? "multipart/form-data" : "application/json",
      },
    });
    // * Get backend data
    const data = await response.json();

    dispatch({ type: SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FAILURE, payload: error.message });
    throw error.response?.data ? error.response.data : error.message;
  }
}
