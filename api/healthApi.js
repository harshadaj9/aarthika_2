export const getHealthScore = async (
  income,
  expenses
) => {

  const response =
    await fetch(
      "http://localhost:5000/health-score",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          income,
          expenses,
        }),
      }
    );

  return await response.json();

};