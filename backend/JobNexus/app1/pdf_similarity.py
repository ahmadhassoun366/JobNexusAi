import os
import PyPDF2   
import pdfplumber
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from django.shortcuts import render

def analyze_pdf_similarity():
    CV = os.path.join('/home/ahmadhassoun/JobNexusAi/backend/JobNexus/static/cv/cv2.pdf')
    Req = os.path.join('/home/ahmadhassoun/JobNexusAi/backend/JobNexus/static/cv/desc.pdf')

    CV_File = open(CV, 'rb')
    Script = PyPDF2.PdfReader(CV_File)
    pages = len(Script.pages)

    print("Number of pages:", pages)

    Script = []
    with pdfplumber.open(CV_File) as pdf:
        for i in range(0, pages):
            page = pdf.pages[i]
            text = page.extract_text()
            print(text)
            Script.append(text)

    Script = ''.join(Script)
    CV_Clear = Script.replace("\n", "")
    CV_Clear

    Req_File = open(Req, 'rb')
    Script_Req = PyPDF2.PdfReader(Req_File)
    pages = len(Script_Req.pages)

    print("Number of pages:", pages)

    Script_Req = []
    with pdfplumber.open(Req_File) as pdf:
        for i in range(0, pages):
            page = pdf.pages[i]
            text = page.extract_text()
            print(text)
            Script_Req.append(text)

    Script_Req = ''.join(Script_Req)
    Req_Clear = Script_Req.replace("\n", "")
    Req_Clear

    Match_Test = [CV_Clear, Req_Clear]

    from sklearn.feature_extraction.text import CountVectorizer
    cv = CountVectorizer()
    count_matrix = cv.fit_transform(Match_Test)

    from sklearn.metrics.pairwise import cosine_similarity
    print('Similarity is :', cosine_similarity(count_matrix))

    MatchPercentage = cosine_similarity(count_matrix)[0][1] * 100
    MatchPercentage = round(MatchPercentage, 2)

    context = {
        'match_percentage': MatchPercentage,
    }
    return context

# Call the analyze_pdf_similarity() function
similarity_result = analyze_pdf_similarity()

# Print the similarity result
if similarity_result is not None:
    print(f"Match Percentage: {similarity_result['match_percentage']}%")
else:
    print("No similarity result found.")