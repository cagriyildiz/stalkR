export default function Controls() {
  return (
    <div className="controls">
      <div className="control-preferences">
        <select name="social-media-platform-select" id="social-media-platform-select">
          <option value="instagram">Instagram</option>
          <option value="twitter">Twitter</option>
        </select>
        <select name="stalk-type" id="stalk-type">
          <option value="instagram-account-privacy">Account Privacy</option>
          <option value="twitter-new-tweets">New Tweets</option>
        </select>
        <input type="text"/>
      </div>
      <button id="stalk-btn">Stalk</button>
    </div>
  );
}