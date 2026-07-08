from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import (
    Flowable,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)


OUTPUT = "public/Homeopathic_Case_Record.pdf"


class Rule(Flowable):
    def __init__(self, width=170 * mm, color=colors.HexColor("#008080")):
        super().__init__()
        self.width = width
        self.height = 1
        self.color = color

    def draw(self):
        self.canv.setStrokeColor(self.color)
        self.canv.setLineWidth(0.8)
        self.canv.line(0, 0, self.width, 0)


def field_row(label, height=8 * mm):
    return [Paragraph(f"<b>{label}</b>", STYLES["FieldLabel"]), ""]


def section_title(text):
    return [
        Spacer(1, 5 * mm),
        Paragraph(text, STYLES["SectionTitle"]),
        Spacer(1, 2 * mm),
    ]


def lines(count, height=9 * mm):
    return [[""] for _ in range(count)], height


def make_lined_table(count, height=9 * mm):
    data, row_height = lines(count, height)
    table = Table(data, colWidths=[170 * mm], rowHeights=[row_height] * count)
    table.setStyle(
        TableStyle(
            [
                ("LINEBELOW", (0, 0), (-1, -1), 0.5, colors.HexColor("#cbd5e1")),
                ("VALIGN", (0, 0), (-1, -1), "BOTTOM"),
            ]
        )
    )
    return table


styles = getSampleStyleSheet()
STYLES = {
    "Title": ParagraphStyle(
        "Title",
        parent=styles["Title"],
        fontName="Helvetica-Bold",
        fontSize=19,
        leading=23,
        textColor=colors.HexColor("#004d4d"),
        alignment=1,
        spaceAfter=4 * mm,
    ),
    "Subtitle": ParagraphStyle(
        "Subtitle",
        parent=styles["BodyText"],
        fontName="Helvetica",
        fontSize=9.5,
        leading=14,
        textColor=colors.HexColor("#475569"),
        alignment=1,
        spaceAfter=4 * mm,
    ),
    "SectionTitle": ParagraphStyle(
        "SectionTitle",
        parent=styles["Heading2"],
        fontName="Helvetica-Bold",
        fontSize=11,
        leading=14,
        textColor=colors.HexColor("#008080"),
        spaceAfter=1 * mm,
    ),
    "FieldLabel": ParagraphStyle(
        "FieldLabel",
        parent=styles["BodyText"],
        fontName="Helvetica-Bold",
        fontSize=8.7,
        leading=10,
        textColor=colors.HexColor("#334155"),
    ),
    "Body": ParagraphStyle(
        "Body",
        parent=styles["BodyText"],
        fontName="Helvetica",
        fontSize=8.8,
        leading=12.5,
        textColor=colors.HexColor("#334155"),
    ),
    "Small": ParagraphStyle(
        "Small",
        parent=styles["BodyText"],
        fontName="Helvetica",
        fontSize=7.8,
        leading=10.5,
        textColor=colors.HexColor("#475569"),
    ),
}


def build_pdf():
    doc = SimpleDocTemplate(
        OUTPUT,
        pagesize=A4,
        rightMargin=18 * mm,
        leftMargin=18 * mm,
        topMargin=16 * mm,
        bottomMargin=16 * mm,
        title="Homeopathic Case Record - Dr. Awanti Dhadphale",
        author="Dr. Awanti Dhadphale",
    )

    story = [
        Paragraph("Dr. Awanti Dhadphale", STYLES["Title"]),
        Paragraph(
            "Homeopathic Case Record and Informed Consent<br/>"
            "B.H.M.S., M.A. Psychology | REBT Practitioner | Certified Soft Skills Trainer",
            STYLES["Subtitle"],
        ),
        Rule(),
        Spacer(1, 5 * mm),
    ]

    patient_rows = [
        field_row("Patient Name"),
        field_row("Date of Birth / Age"),
        field_row("Gender"),
        field_row("Phone"),
        field_row("Email"),
        field_row("Address"),
        field_row("Preferred Consultation: Online / In-clinic"),
        field_row("Emergency Contact"),
    ]
    table = Table(patient_rows, colWidths=[62 * mm, 108 * mm], rowHeights=[9 * mm] * len(patient_rows))
    table.setStyle(
        TableStyle(
            [
                ("GRID", (0, 0), (-1, -1), 0.4, colors.HexColor("#cbd5e1")),
                ("BACKGROUND", (0, 0), (0, -1), colors.HexColor("#f8fafc")),
                ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
                ("LEFTPADDING", (0, 0), (-1, -1), 6),
                ("RIGHTPADDING", (0, 0), (-1, -1), 6),
            ]
        )
    )
    story += section_title("Patient Details")
    story.append(table)

    story += section_title("Chief Complaints")
    story.append(Paragraph("Please describe your main concerns, duration, triggers, and what gives relief.", STYLES["Small"]))
    story.append(make_lined_table(5))

    story += section_title("Medical History")
    story.append(Paragraph("Past illnesses, surgeries, allergies, current medicines, investigations, and family history.", STYLES["Small"]))
    story.append(make_lined_table(5))

    story += section_title("Lifestyle and Emotional Wellbeing")
    story.append(Paragraph("Sleep, appetite, thirst, digestion, menstrual history if applicable, stressors, fears, mood, habits, and daily routine.", STYLES["Small"]))
    story.append(make_lined_table(6))

    story += section_title("Consent")
    story.append(
        Paragraph(
            "I understand that this form supports case taking and does not replace direct medical advice. "
            "I consent to consultation with Dr. Awanti Dhadphale and agree to share accurate health information. "
            "For urgent or emergency symptoms, I understand that I should seek immediate emergency medical care.",
            STYLES["Body"],
        )
    )
    story.append(Spacer(1, 5 * mm))

    signature_rows = [
        [Paragraph("<b>Patient / Guardian Signature</b>", STYLES["FieldLabel"]), "", Paragraph("<b>Date</b>", STYLES["FieldLabel"]), ""],
    ]
    signature_table = Table(signature_rows, colWidths=[48 * mm, 50 * mm, 22 * mm, 50 * mm], rowHeights=[10 * mm])
    signature_table.setStyle(
        TableStyle(
            [
                ("GRID", (0, 0), (-1, -1), 0.4, colors.HexColor("#cbd5e1")),
                ("BACKGROUND", (0, 0), (0, 0), colors.HexColor("#f8fafc")),
                ("BACKGROUND", (2, 0), (2, 0), colors.HexColor("#f8fafc")),
                ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
                ("LEFTPADDING", (0, 0), (-1, -1), 6),
            ]
        )
    )
    story.append(signature_table)
    story.append(Spacer(1, 5 * mm))
    story.append(
        Paragraph(
            "Clinic: Showroom no. 1, 1st Floor, Anant Rukmini Apt., Besides Tathawade garden, Karve Nagar 411052 | "
            "Phone: +91-9511213851 | Email: drawanti@gmail.com",
            STYLES["Small"],
        )
    )

    doc.build(story)


if __name__ == "__main__":
    build_pdf()
    print(OUTPUT)
