# CSV export

`render(records, "csv")` returns a header `name,count` followed by one row per record. Values containing comma, quote, or newline use RFC 4180-style double-quote escaping.
