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
    { icon: <DollarTwoTone />, topicName: t("stock") },
    { icon: <HeartTwoTone />, topicName: t("mood") },
    { icon: <CrownTwoTone />, topicName: t("beauty") },
    { icon: <EditTwoTone />, topicName: t("exam") },
    { icon: <BookTwoTone />, topicName: t("animation") },
    { icon: <CustomerServiceTwoTone />, topicName: t("music") },
    { icon: <VideoCameraTwoTone />, topicName: t("drama") },
    { icon: <SmileTwoTone />, topicName: t("variety") },
    { icon: <StarTwoTone />, topicName: t("idol") },
    { icon: <BugTwoTone />, topicName: t("pet") },
    { icon: <RestTwoTone />, topicName: t("gourmet") },
    { icon: <CarTwoTone />, topicName: t("travel") },
    { icon: <SkinTwoTone />, topicName: t("outfit") },
    { icon: <TrophyTwoTone />, topicName: t("sports") },
    { icon: <ContactsTwoTone />, topicName: t("work") },
  ];
};

export default FoTopicIcons;
