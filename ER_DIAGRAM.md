# Smart Attendance System ER Diagram

```mermaid
erDiagram
    USER ||--o{ ATTENDANCE : records
    USER ||--o{ LEAVE_REQUEST : submits
    USER ||--o{ LEAVE_REQUEST : reviews
    USER ||--o{ NOTIFICATION : receives
    USER ||--o{ NOTIFICATION : sends
    SHIFT_SETTINGS ||--|| SYSTEM : configures

    USER {
        ObjectId _id PK
        string fullName
        string employeeId UK
        string email UK
        string password
        string department
        string position
        string role
        number[] faceDescriptor
        boolean isActive
        string avatar
        date createdAt
        date updatedAt
    }

    ATTENDANCE {
        ObjectId _id PK
        ObjectId userId FK
        string employeeId
        string fullName
        string department
        string position
        string date
        date checkInTime
        date checkOutTime
        date afterLunchCheckIn
        date afterLunchCheckOut
        string status
        number matchConfidence
        number lateMinutes
    }

    LEAVE_REQUEST {
        ObjectId _id PK
        ObjectId employee FK
        string type
        string startDate
        string endDate
        string reason
        string status
        ObjectId reviewedBy FK
        date reviewedAt
        string reviewNote
    }

    NOTIFICATION {
        ObjectId _id PK
        ObjectId recipient FK
        ObjectId sender FK
        string type
        string subject
        string message
        date readAt
    }

    SHIFT_SETTINGS {
        ObjectId _id PK
        string _key UK
        number startHour
        number startMinute
        number gracePeriod
        number endHour
        number endMinute
        boolean lunchEnabled
        number lunchDuration
        boolean notifyCheckIn
        boolean notifyCheckOut
    }

    SYSTEM {
        string name
    }
```

## Export Instructions

1. Open this file in VS Code or copy the Mermaid block.
2. Paste it into https://mermaid.live.
3. Select **Actions** and choose **Download PNG**, **Download SVG**, or **Download Markdown**.
