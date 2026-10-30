import PropTypes from "prop-types";

const SettingsSection = ({
  title,
  description,
  children,
  icon: Icon,
}) => {
  return (
    <div className="settings-section">

      {/* ==========================================
          SECTION HEADER
      ========================================== */}

      <div className="settings-section__header">

        <div className="settings-section__title-wrap">
          {Icon && (
            <div className="settings-section__icon">
              <Icon
                size={19}
                strokeWidth={1.9}
              />
            </div>
          )}

          <div>
            <h2>{title}</h2>

            {description && (
              <p>{description}</p>
            )}
          </div>
        </div>

      </div>

      {/* ==========================================
          SECTION CONTENT
      ========================================== */}

      <div className="settings-section__body">
        {children}
      </div>

    </div>
  );
};

SettingsSection.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  children: PropTypes.node.isRequired,
  icon: PropTypes.elementType,
};

SettingsSection.defaultProps = {
  description: "",
  icon: null,
};

export default SettingsSection;