import {
  DollarTwoTone,
  HeartTwoTone,
  CrownTwoTone,
  EditTwoTone,
  BookTwoTone,
  CustomerServiceTwoTone,
  VideoCameraTwoTone,
  SmileTwoTone,
  StarTwoTone,
  BugTwoTone,
  RestTwoTone,
  CarTwoTone,
  SkinTwoTone,
  TrophyTwoTone,
  ContactsTwoTone,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";

const FoTopicIcons = () => {
  const { t } = useTranslation();

  return [
    { icon: <DollarTwoTone />, topicName: t("stock"), key: "stock" },
    { icon: <HeartTwoTone />, topicName: t("mood"), key: "mood" },
    { icon: <CrownTwoTone />, topicName: t("beauty"), key: "beauty" },
    { icon: <EditTwoTone />, topicName: t("exam"), key: "exam" },
    { icon: <BookTwoTone />, topicName: t("animation"), key: "animation" },
    { icon: <CustomerServiceTwoTone />, topicName: t("music"), key: "music" },
    { icon: <VideoCameraTwoTone />, topicName: t("drama"), key: "drama" },
    { icon: <SmileTwoTone />, topicName: t("variety"), key: "variety" },
    { icon: <StarTwoTone />, topicName: t("idol"), key: "idol" },
    { icon: <BugTwoTone />, topicName: t("pet"), key: "pet" },
    { icon: <RestTwoTone />, topicName: t("gourmet"), key: "gourmet" },
    { icon: <CarTwoTone />, topicName: t("travel"), key: "travel" },
    { icon: <SkinTwoTone />, topicName: t("outfit"), key: "outfit" },
    { icon: <TrophyTwoTone />, topicName: t("sports"), key: "sports" },
    { icon: <ContactsTwoTone />, topicName: t("work"), key: "work" },
  ];
};

export default FoTopicIcons;
