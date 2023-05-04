class Service {
  async getRates(from, to) {
    const fromRatesPromise = this.getRate(from, to);
    const toRatesPromise = this.getRate(to, from);

    return await Promise.all([fromRatesPromise, toRatesPromise]);
  }

  async getRate(from, to) {
    const response = await fetch(
      `https://stocks.algobook.info/api/v1/exchange/rate?from=${from}&to=${to}`
    );
    return await response.json();
  }
}

export default new Service();