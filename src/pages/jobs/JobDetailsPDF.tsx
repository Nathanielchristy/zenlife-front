import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  Image,
  PDFViewer,
} from "@react-pdf/renderer";

// Register font if needed
Font.register({
  family: "Roboto",
  fonts: [
    { src: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxP.ttf" },
    {
      src: "https://fonts.gstatic.com/s/roboto/v27/KFOlCnqEu92Fr1MmEU9fBBc9.ttf",
      fontWeight: 700,
    },
  ],
});

const styles = StyleSheet.create({
  page: {
    display: "flex",
    flexDirection: "column",
    padding: 50,
    fontFamily: "Roboto",
    fontSize: 18,
    justifyContent: "space-between",
  },
  content: {
    flexGrow: 1,
  },
  section: {
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "bold",
    textDecoration: "underline",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 5,
    fontWeight: "bold",
  },
  text: {
    marginBottom: 5,
  },
  image: {
    width: 150,
    height: 50,
    marginBottom: 10,
    alignSelf: "center",
  },
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: "#e5e5e5",
    marginTop: 10,
    marginBottom: 10,
  },
  viewer: {
    paddingTop: 42,
    width: "100%",
    height: "80vh",
    border: "none",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
});

interface StatusHistory {
  jobstatus: string;
  editedBy: string;
  updatedAt: string | number | Date;
}

interface PdfProps {
  record?: {
    jobname?: string;
    clientname?: string;
    salescoordinator?: string;
    jobstatus?: string;
    description?: string;
    designer?: string;
    productionsupervisor?: string;
    printername?: string;
    sitecoordinator?: string;
    installationteam?: string;
    sitelocation?: string;
    statusHistory?: StatusHistory[]; // Make this optional
  };
}

const PdfLayout = ({ record }: any) => {
  const formatDate = (date: string | number | Date) => {
    const d = new Date(date);
    return d.toLocaleDateString();
  };

  return (
    <PDFViewer style={styles.viewer}>
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.content}>
            <View style={styles.section}>
              <Image src={"/Zen.png"} style={styles.image} />
              <Text style={styles.title}>{`Job Name: ${
                record?.jobname || "N/A"
              }`}</Text>
              <Text style={styles.subtitle}>Client Details</Text>
              <View style={styles.divider} />
              <Text style={styles.text}>{`Client Name: ${
                record?.clientname || "N/A"
              }`}</Text>
              <Text style={styles.text}>{`Sales Coordinator: ${
                record?.salescoordinator || "N/A"
              }`}</Text>
              <Text style={styles.text}>{`Job Status: ${
                record?.jobstatus || "N/A"
              }`}</Text>
            </View>
            {record?.description && (
              <View style={styles.section}>
                <Text style={styles.subtitle}>Description</Text>
                <View style={styles.divider} />
                <Text style={styles.text}>{record?.description}</Text>
              </View>
            )}
            <View style={styles.section}>
              <Text style={styles.subtitle}>Production Details</Text>
              <View style={styles.divider} />
              {record?.designer && (
                <Text style={styles.text}>{`Designer: ${
                  record?.designer || "N/A"
                }`}</Text>
              )}
              {record?.productionsupervisor && (
                <Text style={styles.text}>{`Production Supervisor: ${
                  record?.productionsupervisor || "N/A"
                }`}</Text>
              )}
              {record?.printername && (
                <Text style={styles.text}>{`Printer Name: ${
                  record?.printername || "N/A"
                }`}</Text>
              )}
              {record?.sitecoordinator && (
                <Text style={styles.text}>{`Site Coordinator: ${
                  record?.sitecoordinator || "N/A"
                }`}</Text>
              )}
              {record?.installationteam && (
                <Text style={styles.text}>{`Installation Team: ${
                  record?.installationteam || "N/A"
                }`}</Text>
              )}
              {record?.sitelocation && (
                <Text style={styles.text}>{`Site Location: ${
                  record?.sitelocation || "N/A"
                }`}</Text>
              )}
            </View>
            <View style={styles.section}>
              <Text style={styles.subtitle}>Status History</Text>
              <View style={styles.divider} />
              {record?.statusHistory && record.statusHistory.length > 0 ? (
                record.statusHistory.map(
                  (
                    status: {
                      updatedAt: string | number | Date;
                      jobstatus: any;
                      editedBy: any;
                    },
                    index: React.Key | null | undefined
                  ) => (
                    <Text key={index} style={styles.text}>
                      {`${formatDate(status.updatedAt)} - ${
                        status.jobstatus
                      } (Edited by: ${status.editedBy})`}
                    </Text>
                  )
                )
              ) : (
                <Text style={styles.text}>No status history available</Text>
              )}
            </View>
          </View>
          <View style={styles.footer}>
            <Text style={styles.text}>Print Proof Checked By</Text>
            <Text style={styles.text}>Sales Coordinator</Text>
            <Text style={styles.text}>Accounts</Text>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default PdfLayout;
