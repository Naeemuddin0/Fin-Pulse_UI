# **Module 1: User Profiling Of Bussiness Owner And Accountants**

## **Usecases**

### **UC-1.1: Sign Up**
- FR 1.1.1: Enter Bussines Name
- FR 1.1.2: Enter First Name
- FR 1.1.3: Enter Last Name
- FR 1.1.4: Enter Email
- FR 1.1.5: Enter Password
- FR 1.1.6: Confirm Password
- FR 1.1.7: Click Create Account

### **UC-1.2 Verify Account**
- FR 1.2.1: Enter OTP
- FR 1.2.2: Click Verify

### **UC-1.3: Login**
- FR 1.3.1: Enter Email
- FR 1.3.2: Enter Password
- FR 1.3.3: Click Remember me
- FR 1.3.4: Click Login

### **UC -1.4: Forget Password**
- FR 1.4.2: Enter Email to send reset link
- FR 1.4.3: Click Reset Password link
- FR 1.4.4: Enter Password
- FR 1.4.5: Confirm Password
- FR 1.4.6: Return to login page

### **UC-1.5: Change Password**
- FR 1.5.2: Enter Current Password
- FR 1.5.3: Enter New Password
- FR 1.5.4: Confirm New Password
- FR 1.5.5: Click Change Password

### **UC-1.6: Enable Two Factor Auth**
- FR 1.6.2: Select Method(OTP)
- FR 1.6.3: Enter OTP for login

### **UC-1.7: Disable Two Factor Auth**
- FR 1.7.1: Enter Password
- FR 1.7.2: Click Disable 2FA

## **Module 1.8: Role Based Control**

### **UC-1.8.1: Add User**
- FR 1.8.1.1: Enter User Email
- FR 1.8.1.2: Select user role
- FR 1.8.1.3: Click Send Invite

### **UC-1.8.2: Accept Invitation**
- FR 1.8.2.1: Enter Name
- FR 1.8.2.2: Enter new Password
- FR 1.8.2.3: Enter Confirm Password
- FR 1.8.2.4: Click Accept Invitation

### **UC- 1.8.3 User Management**
- FR 1.8.3.1: Select Edit Role
- FR 1.8.3.2: Select User
- FR 1.8.3.3: Select Change Role
- FR 1.8.3.4: Select Delete Role
- FR 1.8.3.4: Enter Admin Password
- FR 1.8.3.5: Click Confirm

---

# **Module 2: Business Setup & Configuration**

## **Use Cases**

### **UC- 2.1 Setup Bussiness Profile**
- FR 2.1.1: Enter Bussiness Name
- FR 2.1.2: Enter Bussiness Email
- FR 2.1.3: Enter Bussiness Contact Number
- FR 2.1.4: Select Bussiness Type
- FR 2.1.5: Enter Bussiness Address
- FR 2.1.6: Save Profile

### **UC- 2.2 Setup Fiscal Year**
- FR 2.2.1: Select Start Date
- FR 2.2.2: Select End Date
- FR 2.2.3: Confirm

### **UC- 2.3 Setup Chart Of Accounts**
- FR 2.3.1: Select Template (Retail, Services and Manufacturing)
- FR 2.3.2: Click to add new ledger category
- FR 2.3.3: Click to edit existing Account
- FR 2.3.4: Click to delete account
- FR 2.3.5: Click to confirm

### **UC- 2.4 Configure Opening Balance**
- FR 2.4.1: Enter In Hand Amount
- FR 2.4.2: Enter Opening Balance Amount
- FR 2.4.3: Select Debit
- FR 2.4.4: Select Credit
- FR 2.4.5: Submit Initial Balance

---

# **Module 3: Vendor & Contact Management**

## **Module 3.1: Vendor Management**

### **UC-3.1.1: Create Vendor Profile**
- FR 3.1.1.1: Enter Name.
- FR 3.1.1.2: Enter Contact Number.
- FR 3.1.1.3: Enter Email Address.
- FR 3.1.1.4: Enter Bank Name.
- FR 3.1.1.5: Enter Bank Account (IBAN).
- FR 3.1.1.6: Select Category
- FR 3.1.1.7: Select Save

### **UC-3.1.2: View Vendor Historical Analytics**
- FR 3.1.2.1: Search vendor
- FR 3.1.2.2: Select a Vendor Profile
- FR 3.1.2.3: View "Total Spend"
- FR 3.1.2.4: View "Average Transaction Value"
- FR 3.1.2.5: View Transaction History

### **UC-3.1.3: Edit Vendor Information**
- FR 3.1.3.1: Select "Edit" on Vendor Profile
- FR 3.1.3.2: Modify Bank Name
- FR 3.1.3.3: Modify Bank Account (IBAN)
- FR 3.1.3.4: Modify Contact Number
- FR 3.1.3.5: Modify Email Address
- FR 3.1.3.6: Click Update Vendor

### **UC-3.1.4: Archive Vendor Contact**
- FR 3.1.4.1: Select "Archive" next to vendor name
- FR 3.1.4.2: View archival confirmation prompt.
- FR 3.1.4.3: Click "Confirm Archive"
- FR 3.1.4.4: View vendor status "Archived".

## **Module 3.2: Employee Management**

### **UC-3.2.1: Add Employee Profiles**
- FR 3.2.1.1: Select Add New Employee.
- FR 3.2.1.2: Enter Employee Full Name.
- FR 3.2.1.3: Enter Department.
- FR 3.2.1.4: Enter Designation.
- FR 3.2.1.5: Select Save Employee Profile.

### **UC-3.2.2: Archive Employee Profile**
- FR 3.1.4.1: Select "Archive" next to Employee name
- FR 3.1.4.2: View archival confirmation prompt.
- FR 3.1.4.3: Click "Confirm Archive"
- FR 3.1.4.4: View vendor status "Archived".

---

# **MODULE 4: Document Upload And Data Extraction**

## **Usecases**

### **UC-4.1: Upload Bank Statement PDF**
- FR 4.1.1: Click "Browse Files"
- FR 4.1.2: Select PDF bank statement
- FR 4.1.3: View upload queue.
- FR 4.1.4: Click "Upload and Extract"

### **UC-4.2: Override Template suggestion**
- FR 4.2.1: Select "Template Override"
- FR 4.2.2: Select specific bank template
- FR 4.2.3: Select "Apply Format"

### **UC-4.3: Verify Extracted Data**
- FR 4.3.1: Select Accurate Transaction Rows
- FR 4.3.2: Click Verify Transactions

### **UC-4.4: Edit Extracted Data**
- FR 4.4.1: Modify transaction date field
- FR 4.4.2: Modify transaction description field
- FR 4.4.3: Modify the transaction amount
- FR 4.4.4: Modify Type Of Payments

### **UC-4.5: Add Missing Rows**
- FR 4.5.1: Add transaction date field
- FR 4.5.2: Add transaction description field
- FR 4.5.3: Add transaction amount
- FR 4.5.4: Add Type Of Payments

### **UC-4.6: Finalize Extracted data**
- FR 4.6.1:View Verified Transactions
- FR 4.6.2: Click "Import to transaction management"

---

# **Module 5:Transaction Review & Categorization**

## **Use Cases**

### **UC- 5.1 Filter Transactions**
- FR 5.1.1: View all imported transactions
- FR 5.1.2: Enter Keywords to filter
- FR 5.1.3: Select Uncategorized Status from filter
- FR 5.1.4: Apply Filter

### **UC- 5.2 Assign Vendor**
- FR 5.2.1: Select Transaction
- FR 5.2.2: View Suggested Vendor
- FR 5.2.3: Select Vendor

### **UC- 5.3 Assign Category**
- FR 5.3.1: Select Category
- FR 5.3.2: View Suggested Expense Category
- FR 5.3.3: Select Category from the chart of Accounts
- FR 5.3.4: Approve Transaction

### **UC -5.4 Approve Transaction**
- FR 5.4.1: Select Transactions
- FR 5.4.2: Click Approve Transactions

### **UC- 5.5 Create Manual Transaction**
- FR 5.5.1: Click to Add Manual Transaction
- FR 5.5.2: Select Transaction Date
- FR 5.5.3: Enter Transaction Description
- FR 5.5.4: Enter Transaction Amount
- FR 5.5.5: Select Vendor from searchable list.
- FR 5.5.6: Select Category from Chart of Accounts.
- FR 5.5.7: Select target Bank Account for the transaction.
- FR 5.5.8: Save Transaction

---

# **Module 6: Bills & Invoice Management**

## **Use Cases**

### **UC-6.1: Record New Vendor Bill**
- FR 6.1.1: Select "New Bill"
- FR 6.1.2: Select Vendor
- FR 6.1.3: Enter Bill Reference Number
- FR 6.1.4: Select Bill Issue Date
- FR 6.1.5: Select Bill Due Date
- FR 6.1.6: Enter Manual Tax amount
- FR 6.1.7: Enter Line Item Description.
- FR 6.1.8: Enter Line Item Quantity.
- FR 6.1.9: Enter Line Item Unit Price
- FR 6.1.10: View Sub-Total
- FR 6.1.11: View Total
- FR 6.1.12: Click "Save and Finalize"

### **UC-6.2: Create Customer Invoice**
- FR 6.2.1: Select "New Invoice"
- FR 6.2.2: Select Customer
- FR 6.2.3: Enter Invoice Number
- FR 6.2.4: Select Invoice Date
- FR 6.2.5: Select Due Date
- FR 6.2.6: Enter Line Item Quantity.
- FR 6.2.7: Enter Line Item Rate.
- FR 6.2.7: Click "Submit Invoice"

### **Use Case 6.3: Record Partial Bill Payment**
- FR 6.3.1: Click Record Payment on Partial bill
- FR 6.3.2: Enter Payment Amount.
- FR 6.3.3: Select Payment Date.
- FR 6.3.4: Select Bank Account IBAN
- FR 6.3.5: Click "Submit Payment"
- FR 6.3.6: View updated Payment Status

### **Use Case 6.4: Record Partial Invoice**
- FR 6.4.1: Click Record Payment on Partial Invoice
- FR 6.4.2: Enter Payment Amount.
- FR 6.4.3: Select Payment Date.
- FR 6.4.4: Select Bank Account IBAN
- FR 6.4.5: Click "Submit Payment"
- FR 6.4.6: View updated Payment Status

### **UC-6.5 Filter Payments**
- FR 6.5.1: Enter Vendor Name
- FR 6.5.2: Click Filter Payments

### **UC-6.6 View Aging Reports**
- FR 6.6.1 View Summary of Debts in Buckets

---

# **Module 7: Bank Account Management**

## **Use Cases**

### **UC- 7.1 Register Bank Account Details**
- FR 7.1.1: Enter Bank Name
- FR 7.1.2: Enter Accoount Title
- FR 7.1.3: Enter Account Number
- FR 7.1.4: Select Account Category
- FR 7.1.5: Enter Opening Balance
- FR 7.1.6: Save Account

### **UC-7.2 Moniter Account Reconcialtion Status**
- FR 7.2.1: View all Registered Bank Accounts
- FR 7.2.2: View "Last Reconciled Date" for each account.
- FR 7.2.3: View Status

### **UC-7.3: View Consolidated Liquidity**
- FR 7.3.1: View "Total Bank Balance"
- FR 7.3.2: View "Petty Cash Total"
- FR 7.3.3: View "Net Position"

### **UC-7.4: Archive Bank Account**
- FR 7.4.1: Select Archive for a chosen account.
- FR 7.4.2: Confirm Account Archived
- FR 7.4.3: View updated status as "Archived"

---

# **Module 8: Bank Reconciliation**

## **Use Cases**

### **UC-8.1: Initialize Reconciliation Session**
- FR 8.1.1: Select target Bank Account
- FR 8.1.2: Select Statement Date Range
- FR 8.1.3: Click "Start Reconciliation"
- FR 8.1.4: View Split-Screen interface

### **UC-8.2: Process Automated Matching**
- FR 8.2.1: Click "Run Auto-Match"
- FR 8.2.2: View High-Confidence Suggestions
- FR 8.2.3: Click "Approve Match"
- FR 8.2.4: View "Matched" status

### **UC-8.3: Manual Record Matching**
- FR 8.3.1: Select an Unmatched transaction from the Statement side.
- FR 8.3.2: Select corresponding Bill from the System side.
- FR 8.3.3: Select corresponding Payment from the System side.
- FR 8.3.4: Click "Manual Match"
- FR 8.3.5: Enter matching description (optional)

### **UC-8.4: Separate Bank Fees from Payment**
- FR 8.4.1: Select "Bank Fee" on a transaction
- FR 8.4.2: Enter the "Base Payment"
- FR 8.4.3: Enter the "Bank Service Charge" amount
- FR 8.4.4: Click "Save Split"

### **UC-8.5: Record Manual Adjustment**
- FR 8.5.1: Click "Add Adjustment"
- FR 8.5.2: Enter Adjustment Amount
- FR 8.5.3: Select Adjustment Account
- FR 8.5.4: Click "Apply Adjustment"

### **UC-8.6: Finalize Reconciliation**
- FR 8.6.1: View Reconciliation Summary report.
- FR 8.6.2: Confirm "Statement Ending Balance" vs "Calculated System Balance"
- FR 8.6.3: Click "Finalize and Lock Statement"

---

# **Module 9: Transaction posting to Ledger**

## **Use Cases**

### **UC-9.1: Manage Chart of Accounts**
- FR 9.1.1: View Hierarchical Tree-View of all accounts.
- FR 9.1.2: Select to view parent accounts
- FR 9.1.3: Enter Search Query into "Account Finder"
- FR 9.1.4: Drag and Drop To Edit Account

### **UC-9.2: Create Manual Journal Entry**
- FR 9.2.1: Select Journal Entry Date
- FR 9.2.2: Enter Journal Reference code
- FR 9.2.3: Select Debit Account from dropdown
- FR 9.2.4: Enter Debit Amount
- FR 9.2.5: Select Credit Account from dropdown
- FR 9.2.6: Enter Credit Amount
- FR 9.2.7: View validation status
- FR 9.2.8: Click "Post Entry"

### **UC-9.3: Create Recurring Journal Template**
- FR 9.3.1: Select "New Recurring Template"
- FR 9.3.2: Enter Template Name
- FR 9.3.3: Select Frequency (Weekly, Monthly, etc.)
- FR 9.3.4: Select Debit Account.
- FR 9.3.5: Enter Debit Amount.
- FR 9.3.6: Select Credit Account.
- FR 9.3.7: Enter Credit Amount
- FR 9.3.8: Click "Save Template"

### **UC-9.4: View Account Ledger Drill-Down**
- FR 9.4.1: Select an Account Balance in the Chart of Accounts
- FR 9.4.2: View detailed transaction log for that specific account
- FR 9.4.3: Enter Start Date Filter
- FR 9.4.4: Enter End Date Filter
- FR 9.4.5: Click a Transaction Reference
- FR 9.4.6: View full journal entry details

### **UC-9.5: Execute Period Closing Wizard**
- FR 9.5.1: Select "Month End Close"
- FR 9.5.2: View checklist of unposted transactions or unreconciled accounts
- FR 9.5.3: Click "Lock Period"
- FR 9.5.4: View "Period Closed" status

### **UC-9.6: Generate Trial Balance Report**
- FR 9.6.1: Select "Trial Balance" from reports list.
- FR 9.6.2: Select Date
- FR 9.6.3: View Total Debit Vs Total Credits
- FR 9.6.4: Verify that Total Debits equal Total Credits

---

# **Module 10: Cash Flow Management**

## **Use Cases**

### **UC-10.1: Generate Cash Flow Statement**
- FR 10.1.1: Select Start Date
- FR 10.1.2: Select End Date
- FR 10.1.3: Report Statements

### **UC-10.2: View Cash Trends**
- FR 10.2.1: Select start date
- FR 10.2.2: Select End Data
- FR 10.2.3: View "Infows against Time"
- FR 10.2.4: View Outflows against Time
- FR 10.2.5: View Balance against Time

### **UC-10.3: View Burn Rate**
- FR 10.3.1: View Daily Burn Rate
- FR 10.3.2: View Monthly Burn Rate
- FR 10.3.3: View Burn rate exceed alert

### **UC-10.4: Cash Runway**
- FR 10.4.1: View Cash Runway

### **UC-10.5: Closing Balances**
- FR 10.5.1: View closing balances by timestamp

---

# **Module 11: Dashboard & Analytics**

## **Use Cases**

### **UC-11.1: Customize Dashboard Layout**
- FR 11.1.1: Select Customize Dashboard
- FR 11.1.2: Click to enable specific Widget cards
- FR 11.1.3: Click to diasable specific Widget cards
- FR 11.1.4: Drag and drop widget
- FR 11.1.5: Click "Save Layout"

### **UC-11.2: Monitor Financial Health Overview**
- FR 11.2.1: View "Net Liquidity Gauge"
- FR 11.2.2: View "Expense Breakdown"
- FR 11.2.3: View "Top 5 Vendors by Spend" Pie Chart
- FR 11.2.4: Click "Export Dashboard"

### **UC-11.3: Set Monthly Financial Targets**
- FR 11.3.1: Select "Budgeting Settings" icon.
- FR 11.3.2: Select specific "Expense Category"
- FR 11.3.3: Enter "Target Amount"
- FR 11.3.4: Click "Set Budget"

---

# **Module 12: Expense Tracking & Analytics**

## **Use Cases**

### **UC-12.1: Monitor Expense Trends**
- FR 12.1.1: View Expense by line chart
- FR 12.1.2: Click to Apply filter (By Category)
- FR 12.1.3: View Expense By Time Stamp

### **UC-12.2: Monitor high value expenses**
- FR 12.2.1: Select threshold
- FR 12.2.2: View list of expenses exceeding threshold
- FR 12.2.3: View vendor details
- FR 12.2.4: Click to view supporting transaction details

### **UC-12.3: Track Category Spending Against Budget**
- FR 12.3.1: View Category wise Expense distribution
- FR 12.3.2: View Progress showing Utilization vs Budget
- FR 12.3.3: View Flag "Over Budget"

---

# **Module 13: Agent Action Centre**

## **Use Cases**

### **UC-13.1: Manage Agent Dashboard**
- FR 13.1.1: Click agent center in sidebar navigation
- FR 13.1.2: View Pending Actions
- FR 13.1.3 : View Action Cards for high-priority financial anomalies
- FR 13.1.4: View specific anomaly detail
- FR 13.1.5 : View reason for flag
- FR 13.1.6: Click "review detail"
- FR 13.1.7: Select "confirm action"
- FR 13.1.8: Select Ignore to cancel alert

### **UC-13.2: Confirm Suggested Categorization**
- FR 13.2.1: View list of transactions
- FR 13.2.2: Review suggested Vendor
- FR 13.2.3: Review expense category
- FR 13.2.4: Click on the approve suggestion
- FR 13.2.5: View Approved suggestion

### **UC-13.3: Instant Insights**
- FR 13.3.1: View top spenders
- FR 13.3.2: View list of top vendors by volume of debt
- FR 13.3.3: View "Summary of Overdue"
- FR 13.3.4: View unpaid bills

### **UC-13.4: Track Agent History**
- FR 13.4.1: View "Agent History Log"
- FR-13.4.2: View history of resolved suggestions

---

# **MODULE 14: Audit Trails And Change History**

## **Use Cases**

### **UC-14.1: Audit Record Modifications**
- FR 14.1.1: Select Search Logs
- FR 14.1.1: Enter Search Criteria (Target ID )
- FR 14.1.1: Enter Search Criteria (Reference Number )
- FR 14.1.2: Select User Name from "Activity Filter"
- FR 14.1.3: View list of timestamped modifications
- FR 14.1.4: View "Before" snapshot of data fields.
- FR 14.1.5: View "After" snapshot of data fields

### **UC-14.2: Track User System Activity**
- FR 14.2.1: Select "User Activity Log"
- FR 14.2.2: View system actions
- FR 14.2.3: View IP Address for each session.
- FR 14.2.4: View Device information for each session

### **UC-14.3: Filter Activities**
- FR 14.3.1: Select Start Date
- FR 14.3.1: Select End Date
- FR 14.3.3: Click Filter
- FR 14.3.4: View Activities

### **UC-14.4: Export Activity Log Report**
- FR 14.4.1: Click "Generate Audit Report"
- FR 14.4.2: Click "Download Report"

---

# **Module 15: Reports and Exports**

## **Use Cases**

### **UC-15.1: Generate Profit And Loss Reports**
- FR 15.1.1: Select "Profit & Loss"
- FR 15.1.2: Select "Start Date"
- FR 15.1.3: Select "End Date"
- FR 15.1.4 : Click Generate
- FR 15.1.5: View table of account Totals

### **UC-15.2: Generate Balance Sheet**
- FR 15.2.1: Select Balance Sheet
- FR 15.2.2: Select "Start Date"
- FR 15.2.3: Select "End Date"
- FR 15.2.4 : Click Generate
- FR 15.2.5: View table of account Totals

### **UC-15.3: Perform Period Comparison Analysis**
- FR 15.3.1: Select "Comparison Mode"
- FR 15.3.2: Select "Period A"
- FR 15.3.3: Select "Period B"
- FR 15.3.4: Click "Compare"
- FR 15.3.5: View side-by-side totals.
- FR 15.3.6: View absolute variance columns.
- FR 15.3.7: View percentage variance columns.

### **UC-15.4: Export Data**
- FR 15.4.1: Click "Export to PDF"
- FR 15.4.2: Select Profit And Loss Report
- FR 15.4.3: Selct Balance Balance Sheet
- FR 15.4.4: Click "Download" save the file locally.
- FR 15.4.5: Click "Export to Excel"

---

# **Module 16: Notification System**

## **Use Case (UC)**

### **UC-16.1 View Notification Inbox**
- FR-16.1.1: Click Bell to toggle dropdown
- FR-16.1.2: Highlight unread items

### **UC-16.2 Manage Notification State**
- FR-16.2.1: Click item to mark as read
- FR-16.2.2: Click "Mark All Read"
- FR-16.2.3: Click item to expand details

### **UC-16.3 Filter & Sort Notifications**
- FR-16.3.1: Filter inbox by Category
- FR-16.3.2: Filter inbox by Date Range
- FR-16.3.3: Sort notifications by Timestamp