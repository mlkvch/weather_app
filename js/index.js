'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App(props) {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.state = {
      'weather': {},
      'units': 'C'
    };
    return _this;
  }

  App.prototype.componentDidMount = function componentDidMount() {
    this.getLocationAndWeather();
  };

  App.prototype.getLocationAndWeather = function getLocationAndWeather() {
    var _this2 = this;

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        var units = _this2.state.units == "C" ? "si" : "us";
        var location = latitude + "," + longitude + "?units=" + units;
        var url = "https://api.darksky.net/forecast/04c3762b193aaee40affb899992cef3e/" + location;
        fetchJsonp(url).then(function (response) {
          return response.json().then(function (json) {
            return _this2.setState({ weather: json });
          });
        });
      });
    }
  };

  App.prototype.onDegClick = function onDegClick() {
    this.state.units == 'C' ? this.setState({ units: 'F' }) : this.setState({ units: 'C' });
    this.getLocationAndWeather();
    console.log('Clicked!');
  };

  App.prototype.render = function render() {

    var title = 'Weather App';
    var subtitle = 'I know where you are and what the weather outside the window...';

    var icon = this.state.weather.currently && this.state.weather.currently.icon ? "wi wi-large wi-forecast-io-" + this.state.weather.currently.icon : '';

    var deg = this.state.weather.currently && this.state.weather.currently.apparentTemperature ? Math.round(this.state.weather.currently.apparentTemperature) : '';

    var summary = this.state.weather.currently && this.state.weather.currently.summary ? this.state.weather.currently.summary : '';

    return React.createElement(
      'div',
      { className: 'app' },
      React.createElement(
        'div',
        { className: 'title' },
        title
      ),
      React.createElement(
        'div',
        { className: 'subtitle' },
        React.createElement(
          'i',
          null,
          subtitle
        )
      ),
      React.createElement(
        'div',
        { className: 'infopanel' },
        React.createElement('i', { className: icon }),
        React.createElement(
          'div',
          { className: 'flex-row pointer ', onClick: this.onDegClick.bind(this) },
          deg,
          '°',
          this.state.units
        ),
        React.createElement(
          'div',
          { className: 'summary' },
          summary
        )
      )
    );
  };

  return App;
}(React.Component);

var Footer = function (_React$Component2) {
  _inherits(Footer, _React$Component2);

  function Footer() {
    _classCallCheck(this, Footer);

    return _possibleConstructorReturn(this, _React$Component2.apply(this, arguments));
  }

  Footer.prototype.render = function render() {
    var footerText = 'Created by ';
    return React.createElement(
      'div',
      { className: 'footer-content' },
      footerText,
      React.createElement(
        'a',
        { href: 'https://vk.com/id_karina_malkevich', target: '_blank' },
        ' Karina Malkevich'
      )
    );
  };

  return Footer;
}(React.Component);

React.render(React.createElement(App, null), document.getElementById('app'));
React.render(React.createElement(Footer, null), document.getElementById('footer'));