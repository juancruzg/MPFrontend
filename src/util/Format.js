const formatMoney = (number, decimals) => {
    decimals = decimals || 2;

    return number.toFixed(decimals).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
  }

export { formatMoney };