import React, { useState, useEffect } from "react";
import { PrismicLink } from "apollo-link-prismic";
import { InMemoryCache } from "apollo-cache-inmemory";
import ApolloClient from "apollo-client";

const client = new ApolloClient({
  link: PrismicLink({
    uri: "https://edapps.prismic.io/graphql"
  }),
  cache: new InMemoryCache()
});

export default function withQuery(Component, query, process = v => v) {
  return function(props) {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    useEffect(() => {
      client
        .query({ query })
        .then(process)
        .then(r => {
          setData(r);
          setLoading(false);
        });
    }, []);
    if (loading) {
      return <div>Loading...</div>;
    }
    return <Component {...props} data={data} />;
  };
}
