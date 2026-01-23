# Project Scope: Fin-Pulse

COMSATS University Islamabad (CUI) 
Project Proposal 
for 
 
Fin-Pulse 
(Agentic Smart Accounting System) 
 
 
Version 1.0 
 
By 
Shehryar Ahmad Khalil     CIIT/SP23-BDS-047/ISB 
                 Naeem Ud Din                     CIIT/SP23-BDS-038/ISB 
Hassan Raza Bangash         CIIT/SP23-BDS-018/ISB 
 
Supervisor 
Dr. Tehseen Riaz Abbasi 
Bachelor of Science in Data-Science (2023-2027) 

 
 
 
Table of Contents 
Abstract ........................................................................................................................................... 1 
1. Introduction ................................................................................................................................. 2 
2. Problem Statement ...................................................................................................................... 2 
3. Problem Solution/Objectives of the Proposed System ............................................................... 2 
3.1 Objectives: ............................................................................................................................ 2 
4. Related System Analysis ............................................................................................................. 3 
5. Vision Statement ......................................................................................................................... 4 
6. Scope ........................................................................................................................................... 4 
7.Modules........................................................................................................................................ 5 
MODULE 1: User Profiling ....................................................................................................... 5 
MODULE 2: Business Setup & Configuration ........................................................................... 5 
MODULE 3: Vendor & Contact Management............................................................................ 5 
MODULE 4: Document Upload & Data Extraction .................................................................. 5 
MODULE 5: Transaction Management...................................................................................... 6 
MODULE 6: Bills & Invoice Management ................................................................................ 6 
MODULE 7: Bank Account Management .................................................................................. 6 
MODULE 8: Bank Reconciliation .............................................................................................. 6 
MODULE 9: General Ledger ..................................................................................................... 7 
MODULE 10: Cash Flow Management ..................................................................................... 7 
MODULE 11: Dashboard & Analytics ....................................................................................... 7 
MODULE 12: Expense Tracking & Analytics ............................................................................ 7 
MODULE 13: Agent Action Centre ............................................................................................ 8 
MODULE 14: Audit Trail & Change History ............................................................................. 8 
MODULE 15: Reports & Exports............................................................................................... 8 
MODULE 16: Notification System ............................................................................................. 8 
8. System Limitations/Constraints .................................................................................................. 9 
9. Data Gathering Approach ........................................................................................................... 9 
10. Tools and Technologies ............................................................................................................. 9 

 
 
11. Project Stakeholders and Roles ................................................................................................11 
12. Module Based Work Division ................................................................................................. 12 
13. WBS and Gantt Chart ............................................................................................................. 13 
14. Mockups .................................................................................................................................. 17 
15. References ............................................................................................................................... 24 
16. Plagiarism Report.................................................................................................................... 27 
Project Category: 
 
 
 
 
Abstract 
 
Fin-Pulse automates labor-intensive manual bookkeeping for Small and Medium Enterprises 
(SMEs). This system streamlines error-prone financial reconciliation processes significantly. 
Currently, business owners manually transcribe transaction data from PDF bank statements into 
spreadsheets. This manual process is inefficient and often leads to severe data fatigue. 
Furthermore, existing tools fail to accurately parse complex Pakistani bank statement layouts. This 
leaves users without any reliable or automated solution for their needs. Fin-Pulse resolves financial 
visibility issues caused by delayed record-keeping practices. This system addresses the difficulty 
of manually matching bank transactions to vendor bills. Fin-Pulse addresses the gap in handling 
localized Pakistani bank statement formats. This system includes intelligent anomaly detection 
which current international tools often overlook. The primary objective involves implementing a 
machine learning pipeline for data extraction. This pipeline extracts structured transaction data 
from bank documents for automated reconciliation. The system provides a verification interface 
to ensure complete data accuracy. Fin-Pulse maintains a double-entry general ledger to ensure 
financial integrity. Additionally, Fin-Pulse offers assisted insights for identifying duplicates and 
spending trends. These insights support decision-making by highlighting key financial patterns. 
Fin-Pulse significantly reduces manual data entry efforts and improves financial accuracy. This 
system empowers SME owners with a clear view of business liquidity. 
 
 
 
 
 
 
 
 B-Web Application/Web Application based Information System                                                  
 C-Problem Solving and Artificial Intelligence   
 H-Image Processing     
1. Introduction 
This document specifies the software scope for Fin-Pulse. Fin-Pulse is a web-based intelligent accounting 
system for SMEs in Pakistan. The background of this system lies in the fragmented nature of current 
financial tools. Business owners possess valuable data within their bank statements. However, merging this 
data with internal records remains difficult. Traditional OCR tools fail on complex Pakistani bank statement 
layouts. This failure leads to frustration and distrust in automation. Fin-Pulse introduces an intelligent 
assistant to parse documents using computer vision. This assistant proactively flags anomalies like duplicate 
payments. It asks users for clarification on unknown transactions. Fin-Pulse learns the unique financial 
fingerprint of the business over time. In this context, the term agent refers here to a system providing 
suggestions. This system prompts for user review rather than acting autonomously. 
2. Problem Statement 
Small business owners in Pakistan currently lack visibility into their true financial health. They spend hours 
manually typing data from PDF bank statements into spreadsheets or excel. This manual process is slow 
and highly prone to typographical errors. Entering hundreds of transactions manually is inefficient and 
causes significant data fatigue. Matching vague bank debits to specific vendor bills is currently a manual 
work. Business owners often confuse available bank balances with actual profit. They spend committed 
funds because they lack a clear net position view. Existing tools perform unreliably when faced with diverse 
Pakistani bank statement layouts. These tools often require extensive manual correction for accurate data 
entry. Current tools are passive and fail to warn users about price increases. 
3. Problem Solution/Objectives of the Proposed System 
Fin-Pulse aims to provide clear visibility into the financial health of small businesses. The system 
will try to minimize the effort required for manual data entry. It seeks to reduce the frequency of 
typographical errors common in manual processes. Fin-Pulse aims to assist users in matching 
vague bank transactions to specific bills. The system will attempt to provide a clear view of the 
business net position. It aims to process diverse bank statement layouts with improved reliability. 
Fin-Pulse will try to proactively identify and flag potential financial anomalies. 
3.1 Objectives: 
The primary objectives of the Fin-Pulse project are as follows: 
BO-1: To design a system for extracting structured data from bank documents. 
BO-2: To provide an interface for reviewing and validating extracted financial data. 
BO-3: To reduce manual data entry reliance while preserving data accuracy. 
BO-4: To support financial reconciliation by organizing transactions into auditable records. 
BO-5: To ensure system recommendations remain advisory and support user decision-making. 
4. Related System Analysis 
Based on the top rated and popular related systems, the following table highlights the weakness and the 
corresponding proposed solutions implemented within Fin-Pulse. 
Table 1: Related Systems Analysis 
Application Name 
Weakness  
Proposed Project Solution 
 
 
QuickBooks Online 
https://quickbooks.intuit.com/ 
• 
Expensive 
for 
small 
Pakistani 
businesses 
making it unaffordable for 
most SMEs. 
• 
Poor support for Pakistani 
bank PDF formats; fails to 
parse complex grid layouts 
from HBL, Meezan, and 
Alfalah 
statements, 
requiring 
manual 
data 
entry. 
• 
Module 1 (Authentication) and 
Module 2 (Business Setup) 
provide 
cost-effective 
multi-
tenant architecture reducing per-
user costs to academic/open-
source pricing. 
• 
Module 4 (Document Upload & 
OCR Extraction) uses a fine-
tuned model on a curated dataset 
of Pakistani bank statement 
layouts to improve extraction 
accuracy compared to traditional 
OCR approaches. 
 
 
 
Excel / Google Sheets 
https://excel.cloud.microsoft/ 
Googlesheets 
• 
Entirely manual data entry 
with no automation; users 
must 
type 
every 
transaction 
from 
bank 
statements, taking 15-20 
hours weekly. 
• 
No error checking or 
outliers detection; prone to 
formula errors, with no 
intelligence 
to 
flag 
duplicate payments, price 
spikes, or budget overruns. 
• 
Module 4 (Document Upload & 
OCR) 
significantly 
reduces 
manual data entry effort through 
assisted 
extraction 
and 
categorization. 
• 
Module 
(Agent 
Action 
Centre) 
delivers 
proactive 
detection for duplicates, outliers. 
Module 
(Audit 
Trail) 
prevents formula 
errors 
by 
maintaining 
append-only 
transaction 
history 
with 
before/after change tracking. 
 
 
 
Expensify 
https://www.expensify.com/ 
• 
Focuses exclusively on 
employee reimbursement 
workflows, 
not 
full 
business 
ledger 
reconciliation.  
• 
lacks 
Accounts 
Payable/Receivable 
management. 
• 
Weak OCR for complex 
table 
grids 
in 
bank 
statements.  
• 
cannot 
handle 
multi-
column 
layouts 
with 
merged cells common in 
Pakistani banks. 
• 
Module 6 (Bills & Invoice 
Management) 
provides 
comprehensive 
Accounts 
Payable and Receivable tracking 
with aging reports.  
• 
Module 8 (Bank Reconciliation) 
matches transactions to bills 
(Date, Amount, Vendor) rather 
than rigid exact matching. 
• 
Module 9 (General Ledger) 
implements 
double-entry 
bookkeeping 
with 
auto-
generated journal entries.  
• 
Module 4 uses fine tuned 
(LayoutLMv3,DeepSeek OCR) 
to understand spatial layouts and 
extract data from complex grid 
structures accurately. 
5. Vision Statement 
For small business owners and accountants in Pakistan who struggle with the manual, error-prone 
process of tracking expenses and reconciling bank statements, the Fin-Pulse Smart Accounting 
System is a web-based financial management platform that digitizes data entry from bank PDFs, 
identifies potential anomalies for review, and provides a consolidated view of financial liquidity. 
Unlike manual spreadsheets or complex enterprise ERPs that lack support for local bank formats, 
Our product utilizes a specialized OCR model to extract structured data from Pakistani bank 
statements and assists users in reconciling records through an interactive, verification-based 
workflow, thereby improving accuracy and operational efficiency over time. 
6. Scope 
Fin-Pulse is a web-based accounting solution designed for Small and Medium-sized Enterprises. 
This system digitizes manual bookkeeping and streamlines bank statement reconciliation. Fin-
Pulse functions as a centralized financial portal with role-based access control. Business Owners 
configure fiscal settings while Accountants manage transaction workflows. Core functionality 
revolves around the Smart Document Ingestion Engine for uploading PDFs. The system utilizes 
a fine-tuned Machine Learning model for data extraction. It extracts transaction data from 
supported Pakistani bank statement formats. Fin-Pulse focuses on a human-in-the-loop workflow 
rather than guaranteeing OCR perfection. The system provides a side-by-side verification 
interface for reviewing extractions. Users can manually correct low-confidence data before final 
entry. Fin-Pulse facilitates a semi-automated reconciliation process for financial management. It 
suggests matches between extracted transactions and internal bills using fuzzy logic. The system 
flags discrepancies based on date, amount, and vendor similarity. The Agent Action Centre 
operates as a background service to detect anomalies. It identifies potential duplicate payments 
or significant price variances. The system surfaces these anomalies as action cards for user 
decision-making. The scope is strictly limited to management accounting and internal reporting. 
It explicitly excludes statutory tax filing services and real-time banking APIs. Legal compliance 
reporting is also excluded from the current scope. 
7.Modules 
The Fin-Pulse system is structured into well-defined functional modules, each responsible for a specific 
aspect of the platform’s operation. The following Functional elements (FE) are numbered locally within 
each module for clarity and do not represent global identifiers. 
MODULE 1: User Profiling 
This module establishes user registration, authentication, and role-based permission management for a 
multi-tenant accounting system. 
 
FE-1: User registration with email verification and business profile creation. 
FE-2: Secure login and "Remember Me" functionality. 
FE-3: Password reset workflow via email verification link. 
FE-4: Two-factor authentication (2FA) support. 
FE-5: Role-based access control (Admin, Accountant). 
MODULE 2: Business Setup & Configuration 
This module establishes the foundational settings for the business, including the company profile, fiscal 
year configuration, and the initial Chart of Accounts structure. 
 
FE-1: Onboarding wizard guiding users through business details, fiscal year setup, and accounting 
preferences. 
FE-2: Company profile creation with business name and address details. 
FE-3: Chart of Accounts setup with industry-specific templates (Retail, Services, Manufacturing). 
FE-4: Opening balance entry for initial account values (Bank, Cash, Equity). 
FE-5: Default currency configuration with Pakistani Rupee (PKR) as the initial system currency. 
 
MODULE 3: Vendor & Contact Management 
This module manages a Comprehensive vendor and employee directory with historical analytics and default 
categorization. 
 
FE-1: Create, view, edit, and delete vendor profiles with contact details and bank information. 
FE-2: Employee profiles for expense attribution/reimbursement. 
FE-3: Vendor categorization and default expense category assignment for automated transaction tagging. 
FE-4: Vendor history timeline showing all transactions, total spend, and average transaction value. 
FE-5: Addition of vendor/employee profiles. 
 
MODULE 4: Document Upload & Data Extraction 
This module handles the intelligent extraction of financial data from uploaded PDF bank statements using 
AI-powered OCR, complete with verification tools for user accuracy. 
 
FE-1: Upload interface for PDF bank statements. 
FE-2: Automatic bank format detection with manual selection override for supported statement layouts. 
FE-3: Preview of extracted transaction data in editable table format with confidence score visualization. 
FE-4: Color-coded transaction rows to visually indicate relative extraction confidence levels. 
FE-5: Manual correction interface for editing low-confidence extracted fields directly within the grid. 
FE-6: Side-by-side comparison view of original PDF and extracted data. 
 
MODULE 5: Transaction Management 
This module provides a centralized interface for users to review, categorize, and approve imported 
transactions, supported by intelligent suggestions to streamline the workflow. 
 
FE-1: Transaction review dashboard displaying all imported and manual transactions with search and 
filtering. 
FE-2: Auto-suggested vendor dropdown based on transaction description. 
FE-3: Expense category suggestions based on previously confirmed transactions. 
FE-4: Manual transaction entry form for cash transactions not captured in bank statements. 
FE-5: Simple "Edit Transaction" interface allowing users to manually adjust amounts or descriptions 
before approval. 
FE-6: Flagging system for "Uncategorized" transactions that require user attention. 
 
MODULE 6: Bills & Invoice Management 
This module facilitates tracking of Accounts Payable and Accounts Receivable, allowing users to record 
bills, issue invoices, and manage partial payments efficiently. This module also supports basic customer 
records for the purpose of tracking receivables. 
 
FE-1: Bill entry form linked to the Vendor Directory for recording unpaid bills (Accounts Payable) and 
Credit Notes. 
FE-2: Invoice creation form for recording customer receivables (Accounts Receivable). 
FE-3: Partial payment recording allowing multiple payments against a single bill. 
FE-4: Aging report generation showing overdue bills (0-30, 30-60, 60-90, 90+ days). 
 
MODULE 7: Bank Account Management 
This module enables the management of multiple bank accounts from different financial institutions, 
providing a consolidated view of liquidity and account-specific transaction histories 
 
FE-1: Add and manage multiple bank accounts from different banks within single business profile. 
FE-2: Consolidated view derived from the most recently uploaded and reconciled bank statements. 
FE-3: Bank account categorization (Operating Account, Savings, Petty Cash, Credit Card). 
FE-4: Individual bank account transaction history with search and filtering capabilities. 
FE-5: Account-specific reconciliation status tracking showing last reconciled date. 
FE-6: Bank account deactivation/archival for closed accounts while preserving historical data. 
 
MODULE 8: Bank Reconciliation 
This module assists users in comparing internal system records with external bank statements, identifying 
matched transactions and highlighting discrepancies for manual resolution. 
 
FE-1: Split-screen reconciliation interface (Bank Statements on left, System Bills on right). 
FE-2: Automated matching suggestions based on amount and date proximity (±3 days) with confidence 
scoring. 
FE-3: Manual matching interface for reconciling unmatched transactions. 
FE-4: Unpresented cheque tracking for issued checks not yet cleared by bank. 
FE-5: Bank fee separator to split vendor payment and bank charges into separate expenses. 
FE-6: Manual adjustment entry for bank errors or missing transactions. 
FE-7: Reconciliation summary report showing matched, unmatched, and pending items with visual 
progress indicator. 
 
MODULE 9: General Ledger 
This module serves as the core double-entry bookkeeping engine, recording all financial journals and 
maintaining the integrity of the accounting equation through strict controls. 
 
FE-1: Chart of Accounts tree-view interface with hierarchical navigation and account management. 
FE-2: Manual journal entry form with debit/credit columns and auto-balancing validation. 
FE-3: Account ledger drill-down view showing all transactions affecting specific accounts. 
FE-4: Journal reversal interface for correcting errors via contra-entries. 
FE-5: Period closing wizard to lock accounting months and prevent backdated edits with administrator 
override support. 
FE-6: Trial balance report showing all account balances and verifying debit/credit equality. 
FE-7: Recurring Journal Templates for repeating transactions. 
 
MODULE 10: Cash Flow Management 
This module tracks the movement of cash in and out of the business, providing analytical tools to monitor 
liquidity trends and operational cash efficiency. 
 
FE-1: Cash flow statement generation distinguishing between Inflows (Revenue) and Outflows (Expenses) 
FE-2: Daily/weekly/monthly cash position tracking with trend visualization. 
FE-3: Cash burn rate calculation showing average daily cash outflow. 
FE-4: Net Cash Change indicator displaying the absolute increase or decrease in cash assets for the 
selected period. 
 
MODULE 11: Dashboard & Analytics 
This module provides visual dashboards and analytics derived from processed financial data across the 
system. 
 
FE-1: Main dashboard with customizable widget layout and date range selector. 
FE-2: Cash flow line chart comparing Total Inflow vs. Total Outflow over selected date ranges. 
FE-3: Net Liquidity gauge calculating Available Cash minus Pending Bills. 
FE-4: Expense breakdown donut chart with drill-down functionality (click slice to see transactions). 
FE-5: Top 5 vendors by spend widget with bar chart visualization.. 
FE-6: Dashboard export as PDF or image for sharing with stakeholders. 
FE-7: Simple monthly budget target input form (Global or Category-level). 
 
MODULE 12: Expense Tracking & Analytics 
This module provides detailed insights into expense patterns, allowing users to identify cost drivers and 
analyze spending trends over time. 
 
FE-1: Expense tracking dashboard showing category-wise spending trends over time. 
FE-2: Expense comparison charts (Month-over-Month, Year-over-Year) with percentage changes. 
FE-3: Visual highlighting of expenses exceeding user-defined thresholds. 
FE-4: Expense composition visualization (Pie Chart) showing percentage distribution of costs by category. 
 
MODULE 13: Agent Action Centre 
This module is a centralized hub for assisted insights and user-guided actions. 
 
FE-1: Agent Dashboard displaying high-priority "Action Cards" for immediate user attention. 
FE-2: One-click confirmation interface for suggested actions requiring user approval. 
FE-3: One-click Insight Buttons for common queries (e.g., 'Show Top Spenders'). 
FE-4: Visual anomaly indicators (e.g., Red Flags) on transaction cards requiring review. 
FE-5: Agent history log tracking user responses to agent suggestions. 
 
MODULE 14: Audit Trail & Change History 
This module maintains a comprehensive log of all system activities and data modifications to ensure 
transparency, traceability, and accountability for internal reviews. 
 
FE-1: Complete audit trail showing all database modifications with user, timestamp, and change details. 
FE-2: User activity log tracking all system actions (login, data entry, edits, deletions). 
FE-3: Before/After comparison view for edited records. 
FE-4: Activity Log Report generation showing all financial period changes and adjustments. 
FE-5: Data export history tracking. 
FE-6: Audit log filtering and search by date range, user, action type, and affected entity. 
 
MODULE 15: Reports & Exports 
This module generates comprehensive financial reporting with customizable templates. 
 
FE-1: Profit & Loss (Income Statement) and Balance Sheet report generation with date range selection. 
FE-2: Cash Flow Statement report tracking Total Inflows and Outflows. 
FE-3: Excel/CSV and PDF export with formatting, company branding. 
FE-4: Report comparison tool for Period A vs Period B analysis. 
FE-5: On-demand report generation and download. 
 
MODULE 16: Notification System  
 
This module handles notification delivery only and does not define alert logic. 
 
FE-1: Global notification inbox aggregating alerts from all modules (Billing, Security, Agent). 
FE-2: Read/Unread status tracking and "Mark All as Read" functionality. 
FE-3: Automated alert delivery system for critical events (e.g., Low Balance, Due Dates). 
FE-4: Notification filtering capability to sort alerts by category (System, Financial, Security) or date range. 
8. System Limitations/Constraints 
The proposed Fin-Pulse system is designed with specific operational boundaries to ensure reliability and 
focus on core accounting functions. 
 
LI-1: The system will not perform real-time Filer/Non-Filer tax status checks due to the instability and 
frequent downtime of the FBR (Federal Board of Revenue) API. Tax calculations will rely on user-
configured default rates rather than live regulatory databases. 
LI-2: OCR accuracy is primarily expected to be higher for "Computer Generated" PDF bank statements 
(digital-native files). Scanned images of paper statements or low-resolution photographs may result in 
lower extraction accuracy due to noise, skew, and poor lighting conditions. 
LI-3: The system supports only Pakistani Rupee (PKR) currency formats initially. Multi-currency handling 
for international transactions (USD, EUR, etc.) is out of scope for this version. 
LI-4: The system does not support automated direct bank feeds (API integration) for real-time balance 
updates, as most Pakistani banks do not offer open banking APIs for third-party developers. All bank data 
ingestion is file-based (PDF/CSV uploads). 
9. Data Gathering Approach 
A mixed-method approach will gather comprehensive requirements for Fin-Pulse. Primary data 
collection involves semi-structured interviews with three local SME owners. A Chartered 
Accountant will be interviewed to understand reconciliation pain points. These interviews will 
help identify specific workflow bottlenecks. A document collection drive will gather anonymized 
PDF bank statements. These statements will originate from major Pakistani banks. The real-world 
dataset faces potential data scarcity and privacy constraints. Synthetically generated bank 
statements will augment the dataset to overcome these issues. This augmentation creates a robust 
training corpus for the system. This dual approach ensures the system addresses actual user needs. 
It also ensures the system handles real-world data variability. All collected bank statements will 
undergo strict anonymization. Personally identifiable information will be removed from all 
documents. Data usage is restricted to academic and experimental purposes. Informed consent will 
be obtained for all data collection.