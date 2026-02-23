import type { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import { useState } from "react";
import styles from "./index.module.css";

// getServerSidePropsから渡されるpropsの型
type Props = {
  initialImageUrl: string;
};

// ページコンポーネント関数にpropsを受け取る引数を追加する
const IndexPage: NextPage<Props> = ({ initialImageUrl }) => {
  const [clickedUrl, setClickedUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false); // 初期状態はfalseにしておく
  const imageUrl = clickedUrl ?? initialImageUrl;

  const handleClick = async () => {
    setLoading(true);
    const newImage = await fetchImage();
    setClickedUrl(newImage.url);
    setLoading(false);
  };

  return (
    <div className={styles.page}>
      <button type="button" onClick={handleClick} className={styles.button}>
        One more cat!
      </button>
      <div className={styles.frame}>
        {loading || (
          <Image
            src={imageUrl}
            alt="A random cat"
            width={400}
            height={400}
            style={{ width: "400px", height: "auto" }}
          />
        )}
      </div>
    </div>
  );
};
export default IndexPage;

// サーバーサイドで実行する処理
export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const image = await fetchImage();
  return {
    props: {
      initialImageUrl: image.url,
    },
  };
};

type CatImage = {
  url: string;
};
const fetchImage = async (): Promise<CatImage> => {
  const res = await fetch("https://api.thecatapi.com/v1/images/search");
  const images = await res.json();
  return images[0];
};
