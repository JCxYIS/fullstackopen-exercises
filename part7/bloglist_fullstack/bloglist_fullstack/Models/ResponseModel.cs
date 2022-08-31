namespace bloglist_fullstack.Models
{
    public class ResponseModel
    {
        public bool IsSuccess { get; set; } = false;
        public string Message { get; set; } = "";
        public object? Data { get; set; } = null;

        public ResponseModel(bool isSuccess, string message, object? data = null)
        {
            this.IsSuccess = isSuccess;
            this.Message = message;
            this.Data = data;
        }
    }

    public class ResponseModel<T> : ResponseModel
    {
        public new T? Data { get; set; }

        public ResponseModel(bool isSuccess, string message, T? data = default)
            : base(isSuccess, message)
        {
            Data = data;
        }
    }
}
