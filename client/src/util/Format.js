const formatMoney = (number, decimals) => {
    if (!number)
        return null;

    if (typeof number === "string")
        return null;

    decimals = decimals || 2;

    return number.toFixed(decimals).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
  }

export { formatMoney };