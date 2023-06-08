declare module "currency-converter-widget" {
  type Currencies =
    | "EUR"
    | "USD"
    | "JPY"
    | "BGN"
    | "CZK"
    | "DKK"
    | "GBP"
    | "HUF"
    | "PLN"
    | "RON"
    | "SEK"
    | "CHF"
    | "ISK"
    | "NOK"
    | "TRY"
    | "AUD"
    | "BRL"
    | "CAD"
    | "CNY"
    | "HKD"
    | "IDR"
    | "ILS"
    | "INR"
    | "KRW"
    | "MXN"
    | "MYR"
    | "NZD"
    | "PHP"
    | "SGD"
    | "THB"
    | "ZAR";

  interface IConverterProps {
    label?: string;
    className?: string;
    fromDefault?: Currencies;
    toDefault?: Currencies;
    iconTheme?: "LIGHT" | "DARK";
    hideIcon?: boolean;
    ImageComp?: any;
  }
  const CurrencyConverter: (props: IConverterProps) => JSX.Element;
}
