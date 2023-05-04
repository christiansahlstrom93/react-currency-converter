import { useEffect, useState } from "react";
import { currencies } from "./currencies";
import service from "./service";
import symbol from "./symbol.svg";
import symbol_bright from "./symbol_bright.svg";
import expand from "./expand.svg";
import expand_night from "./expand-night.svg";
import algobook from "./algobook.png";
import "./styles.css";

export const CurrencyConverter = (props) => {
  const {
    label = "Currency converter",
    className,
    fromDefault = "EUR",
    toDefault = "USD",
    iconTheme = "DARK",
  } = props;
  const [from, setFrom] = useState(fromDefault);
  const [to, setTo] = useState(toDefault);
  const [rates, setRates] = useState({ from: 1, to: 1 });

  const [fromAmount, setFromAmount] = useState(1);
  const [toAmount, setToAmount] = useState("");

  const fetch = async (from, to) => {
    const rates = await service.getRates(from, to);
    setRates({
      to: rates[0].rate,
      from: rates[1].rate,
      updated: rates[0]?.updated,
    });

    setToAmount(Number((fromAmount * rates[0].rate).toFixed(3)));
  };

  useEffect(() => {
    fetch(from, to);
  }, []);

  const onToChange = (to) => {
    const from = Number((to * rates.from).toFixed(3));
    setFromAmount(from);
    setToAmount(to);
  };

  const onFromChange = (from) => {
    const to = Number((from * rates.to).toFixed(3));
    setFromAmount(from);
    setToAmount(to);
  };

  const onFromCurChange = async (fromCur) => {
    setFrom(fromCur);
    fetch(fromCur, to);
  };

  const onToCurChange = async (toCur) => {
    setTo(toCur);
    fetch(from, toCur);
  };

  return (
    <div className={`converter ${className}`}>
      <div className="headlineContainer">
        <img
          className="symbol"
          alt="symbol"
          src={iconTheme === "LIGHT" ? symbol_bright : symbol}
        />
        <span>{label}</span>
      </div>
      <span className="updatedText">
        {rates?.updated ? `Updated ${rates?.updated}` : ""}
      </span>
      <div className="logic">
        <div className="inputContainer">
          <input
            onChange={(e) => onFromChange(e.currentTarget.value)}
            value={fromAmount}
            className="input"
            type="number"
            pattern="[0-9]*"
            min={1}
          />
          <select
            onChange={(e) => onFromCurChange(e.currentTarget.value)}
            value={from}
            className="select"
          >
            {currencies.map((c) => (
              <option
                key={c.code}
                label={c.name}
                value={c.code}
              >
                {c.name}
              </option>
            ))}
          </select>
          <img
            className="chevron"
            alt="chevron"
            src={iconTheme === "LIGHT" ? expand_night : expand}
          />
        </div>
        <div className="inputContainer">
          <input
            onChange={(e) => {
              onToChange(e.currentTarget.value);
            }}
            value={toAmount}
            className="input"
            type="number"
            pattern="[0-9]*"
            min={1}
          />
          <select
            onChange={(e) => onToCurChange(e.currentTarget.value)}
            value={to}
            className="select"
          >
            {currencies.map((c) => (
              <option
                key={c.code}
                label={c.name}
                value={c.code}
              >
                {c.name}
              </option>
            ))}
          </select>
          <img
            className="chevron"
            alt="chevron"
            src={iconTheme === "LIGHT" ? expand_night : expand}
          />
        </div>
      </div>
      <div className="linkContainer">
        <img alt="alogbook" src={algobook} className="algobook" />
        <a
          href="https://algobook.info/"
          className="link"
          target="_blank"
          rel="noreferrer"
        >
          Powered by Algobook
        </a>
      </div>
    </div>
  );
};
