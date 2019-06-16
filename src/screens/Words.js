import React, { useState, useEffect, useMemo } from "react";
import withQuery from "../util/withQuery";
import gql from "graphql-tag";

// const data = [
//   {
//     group: "family",
//     words: [
//       {
//         text: "mum",
//         image: crispsImage
//       },
//       {
//         text: "dad",
//         image: crispsImage
//       },
//       {
//         text: "luke",
//         image: crispsImage
//       },
//       {
//         text: "lucy",
//         image: crispsImage
//       },
//       {
//         text: "dolly",
//         image: crispsImage
//       }
//     ]
//   },
//   {
//     group: "animals",
//     words: [
//       {
//         text: "cat",
//         image: crispsImage
//       },
//       {
//         text: "dog",
//         image: crispsImage
//       },
//       {
//         text: "hen",
//         image: crispsImage
//       },
//       {
//         text: "cow",
//         image: crispsImage
//       },
//       {
//         text: "sheep",
//         image: crispsImage
//       },
//       {
//         text: "frog",
//         image: crispsImage
//       },
//       {
//         text: "lion",
//         image: crispsImage
//       },
//       {
//         text: "fox",
//         image: crispsImage
//       },
//       {
//         text: "fish",
//         image: crispsImage
//       }
//     ]
//   }
// ];

function Words({ confetti, audio, data }) {
  const groups = useMemo(() => data.map(({ group }) => group), [data]);
  const groupWords = useMemo(
    () => data.reduce((acc, cur) => ({ ...acc, [cur.group]: cur.words }), {}),
    [data]
  );
  const [dirty, setDirty] = useState(false);
  const [group, setGroup] = useState(0);
  const [groupProgress, setGroupProgress] = useState(0);
  const [word, setWord] = useState(groupWords[groups[0]][0].text);
  const [image, setImage] = useState(groupWords[groups[0]][0].image);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const handleKeydown = event => {
      if (event.key === word.charAt(index).toLowerCase()) {
        confetti();
        console.log(group, groups.length);
        if (index + 1 >= word.length) {
          if (groupProgress + 1 >= groupWords[groups[group]].length) {
            if (group + 1 >= groups.length) {
              // TODO: Complete words and reset local state
              // For now go back to first group
              setDirty(true);
              setGroup(0);
              setGroupProgress(0);
              setWord(groupWords[groups[0]][0].text);
              setImage(groupWords[groups[0]][0].image);
              setIndex(0);
              setDirty(false);
              return;
            }
            // Completed group, go onto next group
            setDirty(true);
            setGroup(group + 1);
            setGroupProgress(0);
            setWord(groupWords[groups[group + 1]][0].text);
            setImage(groupWords[groups[group + 1]][0].image);
            setIndex(0);
            setDirty(false);
            return;
          }
          // Completed word, go onto next word
          setDirty(true);
          setGroupProgress(groupProgress + 1);
          setWord(groupWords[groups[group]][groupProgress + 1].text);
          setImage(groupWords[groups[group]][groupProgress + 1].image);
          setIndex(0);
          setDirty(false);
          audio.play("success");
          return;
        }
        setIndex(index + 1);
      }
    };
    document.addEventListener("keydown", handleKeydown);
    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  }, [index]);

  if (dirty) {
    return null;
  }

  return [
    <div key="subtitle" className="subtitle">
      {groups[group]}
    </div>,

    index === word.length ? (
      <div key="word">{word}</div>
    ) : (
      <div key="word">
        <span className="word-complete">{word.substring(0, index)}</span>
        <span className="word-current">{word.substring(index, index + 1)}</span>
        <span className="word-incomplete">{word.substring(index + 1)}</span>
      </div>
    ),

    <img key="image" src={image} alt={word} />
  ];
}

export default withQuery(
  Words,
  gql`
    {
      allWord_packs {
        edges {
          node {
            name
            words {
              word {
                ... on Word {
                  text
                  image
                }
              }
            }
          }
        }
      }
    }
  `,
  ({ data }) =>
    data.allWord_packs.edges.map(({ node: wordPack }) => ({
      group: wordPack.name,
      words: wordPack.words.map(({ word }) => ({
        text: word.text,
        image: word.image.url
      }))
    }))
);
