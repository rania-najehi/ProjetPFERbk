import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Link,
  Svg,
  Path,
} from "@react-pdf/renderer";
import emailIcon from "../../../images/icons/envelope-solid.svg";
import phoneIcon from "../../../images/icons/phone-solid.svg";
import githubIcon from "../../../images/icons/github.svg";
import linkedinIcon from "../../../images/icons/linkedin.svg";

// Define your styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    padding: "30px",
    // width: "100%",
  },
  section: {
    marginBottom: "20px",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderBottom: "1px solid #eee",
    paddingBottom: "10px",
    marginBottom: "10px",
  },
  headerImg: {
    borderRadius: "50%",
    width: 100,
    height: 100,
    objectFit: "cover",
    marginRight: 20,
  },
  info: {
    flex: 1,
  },
  h1: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#ff007b",
  },
  h2: {
    fontSize: "15px",
    fontWeight: "normal",
    color: "#777",
  },
  contacts: {
    marginTop: "10px",
    fontSize: "11px",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },
  stackContain: {
    flexDirection: "column",
    // flexWrap: "wrap",
    alignItems: "center",
  },
  contactItem: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginRight: "10px",
    color: "#333",
  },
  para: {
    fontSize: "15px",
    color: "#333",
  },
  contactIcon: {
    width: "16px",
    height: "16px",
    marginRight: 5,
  },
  link: {
    color: "#ff007b",
    textDecoration: "none",
  },
  sectionH3: {
    fontSize: "22px",
    width: "140px",
    marginBottom: "10px",
    borderBottom: "2px solid #ff007b",
    color: "#ff007b",
  },
  item: {
    marginBottom: "10px",
  },
  itemH4: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#333",
  },
  itemP: {
    marginVertical: "2px",
    fontSize: "16px",
    color: "#555",
  },
  skill: {
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: "18px",
    paddingVertical: "7px",
  },
  skillSpan: {
    fontWeight: "bold",
    fontSize: "14px",
  },
});
const githubSvg = (
  <Svg
    style={styles.contactIcon}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 496 512"
  >
    <Path
      fill="#ff007b"
      d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
    />
  </Svg>
);
const emailSvg = (
  <Svg
    style={styles.contactIcon}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
  >
    <Path
      fill="#ff007b"
      d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"
    />
  </Svg>
);
const linkedinSvg = (
  <Svg
    style={styles.contactIcon}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
  >
    <Path
      fill="#ff007b"
      d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"
    />
  </Svg>
);
const phoneSvg = (
  <Svg
    style={styles.contactIcon}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
  >
    <Path
      fill="#ff007b"
      d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"
    />
  </Svg>
);
const PdfDocument = ({ data, binaryImg }) => {
  const { user, education, workHistory, proj, skills } = data;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Image src={binaryImg} style={styles.headerImg} />
          <View style={styles.info}>
            <Text style={styles.h1}>
              {user.firstName} {user.lastName}
            </Text>
            <Text style={styles.h2}>{user.role}</Text>
            <View style={styles.contacts}>
              <View style={styles.contactItem}>
                {emailSvg}
                <Text>{user.email}</Text>
              </View>
              <View style={styles.contactItem}>
                {phoneSvg}
                <Text>{user.phone}</Text>
              </View>
              <Link src={user.github} style={styles.link}>
                <View style={styles.contactItem}>
                  {githubSvg}
                  <Text>{user.github}</Text>
                </View>
              </Link>
              <Link src={user.linkedin} style={styles.link}>
                <View style={styles.contactItem}>
                  {linkedinSvg}
                  <Text>{user.linkedin}</Text>
                </View>
              </Link>
            </View>
            <Text style={styles.para}>{user.about}</Text>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionH3}>Education</Text>
          {education.map((edu, index) => (
            <View style={styles.item} key={index}>
              <Text style={styles.itemH4}>
                {edu.degree} - {edu.college}
              </Text>
              <Text style={styles.itemP}>
                {edu.startDate} - {edu.endDate}
              </Text>
            </View>
          ))}
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionH3}>Work History</Text>
          {workHistory.map((work, index) => (
            <View style={styles.item} key={index}>
              <Text style={styles.itemH4}>
                {work.position} at {work.company}
              </Text>
              <Text style={styles.itemP}>
                {work.startDate} - {work.endDate}
              </Text>
              <Text style={styles.itemP}>{work.description}</Text>
            </View>
          ))}
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionH3}>Projects</Text>
          {proj.map((project, index) => (
            <View style={styles.item} key={index}>
              <Text style={styles.itemH4}>{project.name}</Text>
              <Link src={project.githubLink} style={styles.link}>
                <Text style={styles.itemP}>{project.githubLink}</Text>
              </Link>
              <Text style={styles.itemP}>{project.description}</Text>
              <Text style={styles.itemP}>
                <Text style={{ fontWeight: "bold" }}>Tech Stack:</Text>{" "}
                <View style={styles.stackContain}>
                  {Object.entries(project.techStack).map(
                    ([key, value], idx) => (
                      <Text key={idx}>
                        {key.charAt(0).toUpperCase() + key.slice(1)}:{" "}
                        {value.join(", ")}
                      </Text>
                    )
                  )}
                </View>
              </Text>
            </View>
          ))}
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionH3}>Skills</Text>
          <View>
            <Text style={styles.itemH4}>Technical Skills</Text>
            {skills.technicalSkills.map((skill, index) => (
              <View style={styles.skill} key={index}>
                <Text style={styles.skillSpan}>{skill.skill}</Text>
                <Text style={styles.skillSpan}>{skill.level}</Text>
              </View>
            ))}
          </View>
          <View>
            <Text style={styles.itemH4}>Soft Skills</Text>
            {skills.softSkills.map((skill, index) => (
              <View style={styles.skill} key={index}>
                <Text style={styles.skillSpan}>{skill.skill}</Text>
              </View>
            ))}
          </View>
          <View>
            <Text style={styles.itemH4}>Languages</Text>
            {skills.languages.map((language, index) => (
              <View style={styles.skill} key={index}>
                <Text style={styles.skillSpan}>{language.language}</Text>
                <Text style={styles.skillSpan}>{language.proficiency}</Text>
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default PdfDocument;
