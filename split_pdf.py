from pypdf import PdfReader, PdfWriter

# Read the source PDF
reader = PdfReader('/Users/hasan-msft/msft-dev/my-pm-work/tutorials_merged.pdf')
total_pages = len(reader.pages)
print(f'Total pages in source PDF: {total_pages}')

# Create writers for odd and even pages
odd_writer = PdfWriter()
even_writer = PdfWriter()

# Split pages (page numbers are 1-indexed for user, but 0-indexed in code)
for i, page in enumerate(reader.pages):
    page_num = i + 1  # 1-indexed page number
    if page_num % 2 == 1:  # Odd pages: 1, 3, 5, ...
        odd_writer.add_page(page)
    else:  # Even pages: 2, 4, 6, ...
        even_writer.add_page(page)

# Save the split PDFs
odd_path = '/Users/hasan-msft/msft-dev/my-pm-work/tutorials_merged_odd_pages.pdf'
even_path = '/Users/hasan-msft/msft-dev/my-pm-work/tutorials_merged_even_pages.pdf'

with open(odd_path, 'wb') as f:
    odd_writer.write(f)
print(f'Odd pages PDF saved: {odd_path} ({len(odd_writer.pages)} pages)')

with open(even_path, 'wb') as f:
    even_writer.write(f)
print(f'Even pages PDF saved: {even_path} ({len(even_writer.pages)} pages)')

print('Done!')
