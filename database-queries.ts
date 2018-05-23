export const queries = {

  /**
   * Query for selecting all cards
   */
  selectAllCards: 'SELECT Card.*,' +
    'CardType.ID AS CardTypeID, CardType.Name AS CardTypeName,' +
    'CardType.CreationDate AS CardTypeCreationDate, CardType.ModifiedDate AS CardTypeModifiedDate,' +
    'StatusType.ID AS StatusTypeID, StatusType.Name AS StatusTypeName,' +
    'Verification.ID AS LastVerificationID,' +
    'Verification.VerificationDate AS LastVerificationDate,' +
    'SelfCheck.ID AS LastSelfCheckID,' +
    'SelfCheck.VerificationDate AS LastSelfCheckDate,' +
    'User.UserTypeID, User.Username AS UserUsername, User.Name AS UserName, User.Email AS UserEmail,' +
    'User.CreationDate AS UserCreationDate, User.ModifiedDate AS UserModifiedDate,' +
    'UserType.ID AS UserTypeID, UserType.Name AS UserTypeName, ' +
    'UserStatusType.ID AS UserStatusTypeID, UserStatusType.Name AS UserStatusTypeName ' +
    'FROM Card LEFT JOIN (CardType, StatusType) ON (CardType.ID=Card.CardTypeID AND StatusType.ID=Card.StatusTypeID) ' +
    'LEFT JOIN (User, UserType, StatusType AS UserStatusType) ON ' +
    '(User.ID=Card.UserID AND UserType.ID=User.UserTypeID AND UserStatusType.ID=User.StatusTypeID) ' +
    'LEFT JOIN (Verification) ON (Verification.ID=Card.LastVerificationID) ' +
    'LEFT JOIN (Verification AS SelfCheck) ON (SelfCheck.ID=Card.LastSelfCheckID)',

  /**
   * Query for selecting all card types
   */
  selectAllCardTypes: 'SELECT CardType.*,' +
    'StatusType.ID AS StatusTypeID, StatusType.Name AS StatusTypeName ' +
    'FROM CardType LEFT JOIN (StatusType) ON (StatusType.ID=CardType.StatusTypeID)',

  /**
   * Query for selecting all documents
   */
  selectAllDocuments: 'SELECT Document.*,' +
    'DocumentType.ID AS DocumentTypeID, DocumentType.Name AS DocumentTypeName,' +
    'DocumentType.CreationDate AS DocumentTypeCreationDate, DocumentType.ModifiedDate AS DocumentTypeModifiedDate,' +
    'StatusType.ID AS StatusTypeID, StatusType.Name AS StatusTypeName,' +
    'Verification.ID AS LastVerificationID,' +
    'Verification.VerificationDate AS LastVerificationDate,' +
    'SelfCheck.ID AS LastSelfCheckID,' +
    'SelfCheck.VerificationDate AS LastSelfCheckDate,' +
    'User.UserTypeID, User.Username AS UserUsername, User.Name AS UserName, User.Email AS UserEmail,' +
    'User.CreationDate AS UserCreationDate, User.ModifiedDate AS UserModifiedDate,' +
    'UserType.ID AS UserTypeID, UserType.Name AS UserTypeName, ' +
    'UserStatusType.ID AS UserStatusTypeID, UserStatusType.Name AS UserStatusTypeName ' +
    'FROM Document LEFT JOIN (DocumentType, StatusType) ON (DocumentType.ID=Document.DocumentTypeID AND StatusType.ID=Document.StatusTypeID) ' +
    'LEFT JOIN (User, UserType, StatusType AS UserStatusType) ON (User.ID=Document.UserID AND UserType.ID=User.UserTypeID AND UserStatusType.ID=User.StatusTypeID) ' +
    'LEFT JOIN (Verification) ON (Verification.ID=Document.LastVerificationID) ' +
    'LEFT JOIN (Verification AS SelfCheck) ON (SelfCheck.ID=Document.LastSelfCheckID)',

  /**
   * Query for selecting all deliveries
   */
  selectAllDeliveries: 'SELECT Delivery.*,' +
    'DocumentType.ID AS DocumentTypeID, DocumentType.Name AS DocumentTypeName,' +
    'StatusType.ID AS StatusTypeID, StatusType.Name AS StatusTypeName ' +
    'FROM Delivery LEFT JOIN (DocumentType, StatusType) ON (DocumentType.ID=Delivery.DocumentTypeID AND StatusType.ID=Delivery.StatusTypeID)',

  /**
   * Query for selecting all document types
   */
  selectAllDocumentTypes: 'SELECT DocumentType.*,' +
    'StatusType.ID AS StatusTypeID, StatusType.Name AS StatusTypeName ' +
    'FROM DocumentType LEFT JOIN (StatusType) ON (StatusType.ID=DocumentType.StatusTypeID)',

  /**
   * Query for selecting all receipts
   */
  selectAllReceipts: 'SELECT Receipt.*,' +
    'Card.CardTypeID, Card.CardNumber, Card.Location AS CardLocation,' +
    'Card.Comment AS CardComment, Card.ExpirationDate AS CardExpirationDate,' +
    'Card.CreationDate AS CardCreationDate, Card.ModifiedDate AS CardModifiedDate,' +
    'Card.StatusTypeID AS CardStatusTypeID, Card.ActiveReceiptID AS CardActiveReceiptID,' +
    'CardType.ID AS CardTypeID, CardType.Name AS CardTypeName,' +
    'CardStatusType.ID AS CardStatusTypeID, CardStatusType.Name AS CardStatusTypeName,' +
    'Document.DocumentTypeID, Document.DocumentNumber, Document.Name AS DocumentName,' +
    'Document.Sender AS DocumentSender, Document.Location AS DocumentLocation,' +
    'Document.Comment AS DocumentComment, Document.DocumentDate,' +
    'Document.RegistrationDate AS DocumentRegistrationDate,' +
    'Document.CreationDate AS DocumentCreationDate,' +
    'Document.ModifiedDate AS DocumentModifiedDate,' +
    'Document.StatusTypeID AS DocumentStatusTypeID, Document.ActiveReceiptID AS DocumentActiveReceiptID,' +
    'DocumentType.ID AS DocumentTypeID, DocumentType.Name AS DocumentTypeName,' +
    'DocumentStatusType.ID AS DocumentStatusTypeID, DocumentStatusType.Name AS DocumentStatusTypeName,' +
    'ItemType.ID AS ItemTypeID, ItemType.Name AS ItemTypeName,' +
    'User.UserTypeID, UserType.ID AS UserTypeID, UserType.Name AS UserTypeName, ' +
    'User.Username AS UserUsername, User.Name AS UserName, User.Email AS UserEmail,' +
    'User.CreationDate AS UserCreationDate, User.ModifiedDate AS UserModifiedDate, ' +
    'UserStatusType.ID as UserStatusTypeID, UserStatusType.Name AS UserStatusTypeName ' +
    'FROM Receipt LEFT JOIN (Card, CardType, StatusType AS CardStatusType) ON (Card.ID=Receipt.CardID AND CardType.ID=Card.CardTypeID AND CardStatusType.ID=Card.StatusTypeID) ' +
    'LEFT JOIN (Document, DocumentType, StatusType AS DocumentStatusType) ON (Document.ID=Receipt.DocumentID AND DocumentType.ID=Document.DocumentTypeID AND DocumentStatusType.ID=Document.StatusTypeID) ' +
    'LEFT JOIN (ItemType) ON (ItemType.ID = Receipt.ItemTypeID) ' +
    'LEFT JOIN (User, UserType, StatusType AS UserStatusType) ON (User.ID=Receipt.UserID AND UserType.ID=User.UserTypeID AND UserStatusType.ID=User.StatusTypeID)',

  /**
   * Query for selecing all log events
   */
  selectAllLogEvents: 'SELECT LogEvent.*,' +
    'Card.CardTypeID, Card.CardNumber, Card.Location AS CardLocation,' +
    'Card.Comment AS CardComment, Card.ExpirationDate AS CardExpirationDate,' +
    'Card.CreationDate AS CardCreationDate, Card.ModifiedDate AS CardModifiedDate,' +
    'Card.StatusTypeID AS CardStatusTypeID, Card.ActiveReceiptID AS CardActiveReceiptID,' +
    'CardType.ID AS CardTypeID, CardType.Name AS CardTypeName,' +
    'CardStatusType.ID AS CardStatusTypeID, CardStatusType.Name AS CardStatusTypeName,' +
    'Document.DocumentTypeID, Document.DocumentNumber, Document.Name AS DocumentName,' +
    'Document.Sender AS DocumentSender, Document.Location AS DocumentLocation,' +
    'Document.Comment AS DocumentComment, Document.DocumentDate,' +
    'Document.RegistrationDate AS DocumentRegistrationDate,' +
    'Document.CreationDate AS DocumentCreationDate,' +
    'Document.ModifiedDate AS DocumentModifiedDate,' +
    'Document.StatusTypeID AS DocumentStatusTypeID, Document.ActiveReceiptID AS DocumentActiveReceiptID,' +
    'DocumentType.ID AS DocumentTypeID, DocumentType.Name AS DocumentTypeName,' +
    'DocumentStatusType.ID AS DocumentStatusTypeID, DocumentStatusType.Name AS DocumentStatusTypeName,' +
    'ItemType.ID AS ItemTypeID, ItemType.Name AS ItemTypeName,' +
    'User.UserTypeID, UserType.ID AS UserTypeID, UserType.Name AS UserTypeName, ' +
    'User.Username AS UserUsername, User.Name AS UserName, User.Email AS UserEmail,' +
    'User.CreationDate AS UserCreationDate, User.ModifiedDate AS UserModifiedDate, ' +
    'UserStatusType.ID as UserStatusTypeID, UserStatusType.Name AS UserStatusTypeName, ' +
    'LogType.ID AS LogTypeID, LogType.Name AS LogTypeName, LogType.LogText AS LogTypeText ' +
    'FROM LogEvent LEFT JOIN (Card, CardType, StatusType AS CardStatusType) ON (Card.ID=LogEvent.CardID AND CardType.ID=Card.CardTypeID AND CardStatusType.ID=Card.StatusTypeID) ' +
    'LEFT JOIN (Document, DocumentType, StatusType AS DocumentStatusType) ON (Document.ID=LogEvent.DocumentID AND DocumentType.ID=Document.DocumentTypeID AND DocumentStatusType.ID=Document.StatusTypeID) ' +
    'LEFT JOIN (ItemType) ON (ItemType.ID = LogEvent.ItemTypeID) ' +
    'LEFT JOIN (User, UserType, StatusType AS UserStatusType) ON (User.ID=LogEvent.UserID AND UserType.ID=User.UserTypeID AND UserStatusType.ID=User.StatusTypeID) ' +
    'LEFT JOIN (LogType) ON (LogType.ID = LogEvent.LogTypeID)',

  /**
   * Query for selecting all verifications
   */
  selectAllVerifications: 'SELECT Verification.*,' +
    'Card.CardTypeID, Card.CardNumber, Card.Location AS CardLocation,' +
    'Card.Comment AS CardComment, Card.ExpirationDate AS CardExpirationDate,' +
    'Card.CreationDate AS CardCreationDate, Card.ModifiedDate AS CardModifiedDate,' +
    'Card.StatusTypeID AS CardStatusTypeID, Card.ActiveReceiptID AS CardActiveReceiptID,' +
    'CardType.ID AS CardTypeID, CardType.Name AS CardTypeName,' +
    'CardStatusType.ID AS CardStatusTypeID, CardStatusType.Name AS CardStatusTypeName,' +
    'Document.DocumentTypeID, Document.DocumentNumber, Document.Name AS DocumentName,' +
    'Document.Sender AS DocumentSender, Document.Location AS DocumentLocation,' +
    'Document.Comment AS DocumentComment, Document.DocumentDate,' +
    'Document.RegistrationDate AS DocumentRegistrationDate,' +
    'Document.CreationDate AS DocumentCreationDate,' +
    'Document.ModifiedDate AS DocumentModifiedDate,' +
    'Document.StatusTypeID AS DocumentStatusTypeID, Document.ActiveReceiptID AS DocumentActiveReceiptID,' +
    'DocumentType.ID AS DocumentTypeID, DocumentType.Name AS DocumentTypeName,' +
    'DocumentStatusType.ID AS DocumentStatusTypeID, DocumentStatusType.Name AS DocumentStatusTypeName,' +
    'ItemType.ID AS ItemTypeID, ItemType.Name AS ItemTypeName,' +
    'User.UserTypeID, UserType.ID AS UserTypeID, UserType.Name AS UserTypeName, ' +
    'User.Username AS UserUsername, User.Name AS UserName, User.Email AS UserEmail,' +
    'User.CreationDate AS UserCreationDate, User.ModifiedDate AS UserModifiedDate, ' +
    'UserStatusType.ID as UserStatusTypeID, UserStatusType.Name AS UserStatusTypeName ' +
    'FROM Verification LEFT JOIN (Card, CardType, StatusType AS CardStatusType) ON (Card.ID=Verification.CardID AND CardType.ID=CardTypeID AND CardStatusType.ID=Card.StatusTypeID) ' +
    'LEFT JOIN (Document, DocumentType, StatusType AS DocumentStatusType) ON (Document.ID=Verification.DocumentID AND DocumentType.ID=Document.DocumentTypeID AND DocumentStatusType.ID=Document.StatusTypeID) ' +
    'LEFT JOIN (ItemType) ON (ItemType.ID = Verification.ItemTypeID) ' +
    'LEFT JOIN (User, UserType, StatusType AS UserStatusType) ON (User.ID=Verification.UserID AND UserType.ID=User.UserTypeID AND UserStatusType.ID=User.StatusTypeID)',

  /**
   * Query for selecting all users
   */
  selectAllUsers: 'SELECT User.*,' +
    'StatusType.ID AS StatusTypeID, StatusType.Name AS StatusTypeName, ' +
    'UserType.ID AS UserTypeID, UserType.Name AS UserTypeName ' +
    'FROM User LEFT JOIN (UserType, StatusType) ON (UserType.ID=User.UserTypeID AND StatusType.ID=User.StatusTypeID)',

}