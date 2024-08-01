
function Subject(studentName, subjectName, courseDuration) {
    this.studentName = studentName;
    this.subjectName = subjectName;
    this.courseDuration = courseDuration;
    
    this.toString = function() {
        return `Student: ${this.studentName}, Subject: ${this.subjectName}, Duration: ${this.courseDuration} weeks`;
    }
}

var enrollmentsArray = [];

function addEnrollment() {
    var studentName = document.getElementById("studentName").value.trim();
    var subjectName = document.getElementById("subjectName").value;
    var courseDuration = parseInt(document.getElementById("courseDuration").value.trim());

    if (!studentName || typeof studentName !== 'string') {
        alert("Invalid student name. Please provide a non-empty string.");
        return;
    }
    if (!subjectName || typeof subjectName !== 'string') {
        alert("Invalid subject name. Please select a subject from the dropdown.");
        return;
    }
    if (isNaN(courseDuration) || courseDuration <= 0) {
        alert("Invalid duration. Please provide a positive number.");
        return;
    }

    var enrollment = new Subject(studentName, subjectName, courseDuration);
    enrollmentsArray.push(enrollment);
    displayEnrollments(enrollmentsArray);
}

function deleteEnrollment(index) {
    enrollmentsArray.splice(index, 1);
    displayEnrollments(enrollmentsArray);
}

function sortEnrollments() {
    var criteria = document.getElementById("sortCriteria").value;

    enrollmentsArray.sort((a, b) => {
        if (criteria === "studentName") {
            return a.studentName.localeCompare(b.studentName);
        } else if (criteria === "subjectName") {
            return a.subjectName.localeCompare(b.subjectName);
        }
    });

    displayEnrollments(enrollmentsArray);
}




function filterEnrollments() {
    var criteria = document.getElementById("filterCriteria").value;
    var filteredEnrollments = enrollmentsArray;

    if (criteria === "greaterThan8") {
        filteredEnrollments = enrollmentsArray.filter(enrollment => enrollment.courseDuration > 8);
    } else if (criteria === "lessThanOrEqual8") {
        filteredEnrollments = enrollmentsArray.filter(enrollment => enrollment.courseDuration <= 8);
    }

    displayEnrollments(filteredEnrollments);
}

function displayEnrollments(enrollments) {
    var enrollmentList = document.getElementById("enrollmentList");
    enrollmentList.innerHTML = '';

    enrollments.forEach((enrollment, index) => {
        var row = document.createElement("tr");
        row.innerHTML = `
            <td>${enrollment.studentName}</td>
            <td>${enrollment.subjectName}</td>
            <td>${enrollment.courseDuration}</td>
            <td><button class="delete-btn" onclick="deleteEnrollment(${index})">Delete</button></td>
        `;
        enrollmentList.appendChild(row);
    });
}


